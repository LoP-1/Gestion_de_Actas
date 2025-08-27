package com.gestion_actas.gestion.de.actas.repository;

import com.gestion_actas.gestion.de.actas.model.ActasPersonal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActasRepository extends JpaRepository <ActasPersonal,Long>{
}
