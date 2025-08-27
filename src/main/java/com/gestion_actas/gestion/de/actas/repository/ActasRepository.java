package com.gestion_actas.gestion.de.actas.repository;

import com.gestion_actas.gestion.de.actas.model.ActasPersonal;
import com.gestion_actas.gestion.de.actas.model.DTO.ActasUsuarioDTO;
import com.gestion_actas.gestion.de.actas.model.DTO.DetalleActasDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActasRepository extends JpaRepository<ActasPersonal, Long> {

    // Query nativa (usa nombres de columnas de la BD)
    @Query(
            value = "SELECT `codigo modular`, ape_paterno, ape_materno, nombres, tipo_documento, nro_documento, `cargo/orig`, COUNT(*) AS cantidad " +
                    "FROM actas_personal " +
                    "GROUP BY `codigo modular`, ape_paterno, ape_materno, nombres, tipo_documento, nro_documento, `cargo/orig` " +
                    "ORDER BY cantidad DESC",
            nativeQuery = true
    )
    List<Object[]> obtenerResumenUsuarios();
}
