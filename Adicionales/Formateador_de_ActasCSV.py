import pandas as pd
import glob, os, re
from decimal import Decimal, getcontext

# ================= CONFIG =================
CARPETA = ""
SEP = ';'
RESPALDO_EXTENSION = ".bak"
PRECISION_DECIMAL = 80
ACTIVAR_NORMALIZACION_SCI = True
ACTIVAR_REEMPLAZO_ENIE = True
# ==========================================

getcontext().prec = PRECISION_DECIMAL

# Patrón que encuentra números en notación científica (solo positivos)
# Lo aplicaremos dentro de cualquier texto, no tiene que abarcar toda la celda.
PATRON_SCI_INLINE = re.compile(r'([0-9]+(?:\.[0-9]+)?E\+[0-9]+)', re.IGNORECASE)

PATRON_PALABRA_YEN = re.compile(r'[\w¥]+', re.UNICODE)

def decidir_enie_para_palabra(palabra):
    letras = [c for c in palabra if c.isalpha() and c != '¥']
    if not letras:
        reemplazo = 'ñ'
    else:
        todas_mayus = all(c.isupper() for c in letras)
        reemplazo = 'Ñ' if todas_mayus else 'ñ'
    return palabra.replace('¥', reemplazo)

def reemplazar_yen_contextual(cadena: str):
    if not isinstance(cadena, str) or '¥' not in cadena:
        return cadena, 0
    reemplazos = 0
    resultado = []
    last = 0
    for m in PATRON_PALABRA_YEN.finditer(cadena):
        s, e = m.span()
        palabra = m.group()
        if '¥' in palabra:
            nueva = decidir_enie_para_palabra(palabra)
            reemplazos += palabra.count('¥')
            resultado.append(cadena[last:s])
            resultado.append(nueva)
            last = e
    if reemplazos == 0:
        return cadena, 0
    resultado.append(cadena[last:])
    return "".join(resultado), reemplazos

def expandir_cientificos(texto: str):
    """
    Reemplaza todos los fragmentos en notación científica dentro de la cadena.
    Mantiene enteros sin exponentes. Si hay fracción exacta -> formato decimal plano.
    """
    if not isinstance(texto, str):
        return texto, 0
    original = texto
    cambios = 0

    def repl(m):
        nonlocal cambios
        token = m.group(1)
        try:
            d = Decimal(token)
            # ¿Es entero exacto?
            if d == d.to_integral_value():
                s = format(int(d), 'd')
            else:
                # decimal plano sin e+
                s = format(d, 'f').rstrip('0').rstrip('.')
            cambios += 1
            return s
        except Exception:
            return token  # no se pudo convertir, dejar igual

    # Quitamos comillas envolventes y espacios globales antes (para evitar sorpresas)
    stripped = texto.strip()
    if (stripped.startswith('"') and stripped.endswith('"')) or (stripped.startswith("'") and stripped.endswith("'")):
        stripped = stripped[1:-1]

    nuevo = PATRON_SCI_INLINE.sub(repl, stripped)
    return (nuevo, cambios) if cambios else (original, 0)

def limpiar_nombre_col(col):
    return "".join(ch for ch in col if ch.isprintable()).strip()

def procesar_archivo(ruta):
    print(f"\nProcesando: {ruta}")
    df = pd.read_csv(ruta, sep=SEP, dtype=str, encoding='utf-8', engine='python')

    # Normalizar encabezados
    cols_orig = df.columns.tolist()
    df.columns = [limpiar_nombre_col(c) for c in df.columns]
    if cols_orig != list(df.columns):
        print("  => Encabezados normalizados.")

    resumen_sci = {}
    resumen_enie = {}

    for col in df.columns:
        col_cambios_sci = 0
        col_cambios_enie = 0

        def transformar(valor):
            nonlocal col_cambios_sci, col_cambios_enie
            v = valor

            # Expandir notación científica (en cualquier parte de la celda)
            if ACTIVAR_NORMALIZACION_SCI and isinstance(v, str) and ('E+' in v or 'e+' in v):
                v2, c = expandir_cientificos(v)
                if c:
                    col_cambios_sci += c
                    v = v2

            # Reemplazar ¥
            if ACTIVAR_REEMPLAZO_ENIE and isinstance(v, str) and '¥' in v:
                v2, c = reemplazar_yen_contextual(v)
                if c:
                    col_cambios_enie += c
                    v = v2

            return v

        df[col] = df[col].apply(transformar)

        if col_cambios_sci:
            resumen_sci[col] = col_cambios_sci
        if col_cambios_enie:
            resumen_enie[col] = col_cambios_enie

    if resumen_sci:
        print("  => Reemplazos notación científica (tokens convertidos):")
        for c, n in resumen_sci.items():
            print(f"     - {c}: {n}")
    else:
        print("  => No se detectaron tokens científicos a convertir.")

    if resumen_enie:
        print("  => Reemplazos '¥' -> 'Ñ/ñ':")
        for c, n in resumen_enie.items():
            print(f"     - {c}: {n}")

    # Backup
    backup = ruta + RESPALDO_EXTENSION
    if not os.path.exists(backup):
        os.rename(ruta, backup)
        print(f"  => Backup creado: {backup}")
    else:
        print(f"  => Backup ya existía: {backup}")

    df.to_csv(ruta, sep=SEP, index=False, encoding='utf-8', quoting=1)
    print("  => Guardado.")

def main():
    archivos = glob.glob(os.path.join(CARPETA, "*.csv"))
    if not archivos:
        print("No se encontraron CSV.")
        return
    for a in archivos:
        procesar_archivo(a)
    print("\nFinalizado.")
    
if __name__ == "__main__":
    main()