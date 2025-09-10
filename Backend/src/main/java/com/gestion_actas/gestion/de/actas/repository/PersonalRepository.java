package com.gestion_actas.gestion.de.actas.repository;

import com.gestion_actas.gestion.de.actas.model.Personal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//repositorio para el login y una busqueda por DNI
@Repository
public interface PersonalRepository extends JpaRepository<Personal, Long> {
    Optional<Personal> findByDni(String dni);
}