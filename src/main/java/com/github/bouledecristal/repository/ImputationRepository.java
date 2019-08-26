package com.github.bouledecristal.repository;

import com.github.bouledecristal.domain.Imputation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Imputation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImputationRepository extends JpaRepository<Imputation, Long> {

}
