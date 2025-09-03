package com.gestion_actas.gestion.de.actas.model.DTO;


//estructura de respuesta para muestra de periodos
public class InicioPeriodosDTO {
    private String PeriodoPago;
    private String Month;
    private int Year;

    public InicioPeriodosDTO(String PeriodoPago){
        this.PeriodoPago = PeriodoPago;
        parsePeriodoPago();
    }

    private void parsePeriodoPago() {
        if (PeriodoPago != null && PeriodoPago.length() == 6) {
            // Extraer año y mes
            String yearStr = PeriodoPago.substring(0, 4);
            String monthStr = PeriodoPago.substring(4, 6);

            // Asignar año
            this.Year = Integer.parseInt(yearStr);

            // Asignar nombre del mes
            this.Month = getMonthName(Integer.parseInt(monthStr));
        }
    }
    //asignar valores textuales a los numeros del mes
    private String getMonthName(int month) {
        String[] months = {
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        };
        if (month >= 1 && month <= 12) {
            return months[month - 1];
        }
        return "Mes inválido";
    }

    // Getters para obtener datos (no se usan por ahora...)
    public String getPeriodoPago() { return PeriodoPago; }
    public String getMonth() { return Month; }
    public int getYear() { return Year; }
}
