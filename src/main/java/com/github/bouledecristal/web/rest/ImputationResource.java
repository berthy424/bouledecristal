package com.github.bouledecristal.web.rest;

import com.github.bouledecristal.domain.Imputation;
import com.github.bouledecristal.repository.ImputationRepository;
import com.github.bouledecristal.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.github.bouledecristal.domain.Imputation}.
 */
@RestController
@RequestMapping("/api")
public class ImputationResource {

    private final Logger log = LoggerFactory.getLogger(ImputationResource.class);

    private static final String ENTITY_NAME = "imputation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ImputationRepository imputationRepository;

    public ImputationResource(ImputationRepository imputationRepository) {
        this.imputationRepository = imputationRepository;
    }

    /**
     * {@code POST  /imputations} : Create a new imputation.
     *
     * @param imputation the imputation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new imputation, or with status {@code 400 (Bad Request)} if the imputation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/imputations")
    public ResponseEntity<Imputation> createImputation(@RequestBody Imputation imputation) throws URISyntaxException {
        log.debug("REST request to save Imputation : {}", imputation);
        if (imputation.getId() != null) {
            throw new BadRequestAlertException("A new imputation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Imputation result = imputationRepository.save(imputation);
        return ResponseEntity.created(new URI("/api/imputations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /imputations} : Updates an existing imputation.
     *
     * @param imputation the imputation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated imputation,
     * or with status {@code 400 (Bad Request)} if the imputation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the imputation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/imputations")
    public ResponseEntity<Imputation> updateImputation(@RequestBody Imputation imputation) throws URISyntaxException {
        log.debug("REST request to update Imputation : {}", imputation);
        if (imputation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Imputation result = imputationRepository.save(imputation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, imputation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /imputations} : get all the imputations.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of imputations in body.
     */
    @GetMapping("/imputations")
    public List<Imputation> getAllImputations() {
        log.debug("REST request to get all Imputations");
        return imputationRepository.findAll();
    }

    /**
     * {@code GET  /imputations/:id} : get the "id" imputation.
     *
     * @param id the id of the imputation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the imputation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/imputations/{id}")
    public ResponseEntity<Imputation> getImputation(@PathVariable Long id) {
        log.debug("REST request to get Imputation : {}", id);
        Optional<Imputation> imputation = imputationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(imputation);
    }

    /**
     * {@code DELETE  /imputations/:id} : delete the "id" imputation.
     *
     * @param id the id of the imputation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/imputations/{id}")
    public ResponseEntity<Void> deleteImputation(@PathVariable Long id) {
        log.debug("REST request to delete Imputation : {}", id);
        imputationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
