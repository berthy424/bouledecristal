package com.github.bouledecristal.web.rest;

import com.github.bouledecristal.BouleDeCristalApp;
import com.github.bouledecristal.domain.Imputation;
import com.github.bouledecristal.repository.ImputationRepository;
import com.github.bouledecristal.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.github.bouledecristal.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ImputationResource} REST controller.
 */
@SpringBootTest(classes = BouleDeCristalApp.class)
public class ImputationResourceIT {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_DATE = Instant.ofEpochMilli(-1L);

    private static final Integer DEFAULT_VALEUR = 1;
    private static final Integer UPDATED_VALEUR = 2;
    private static final Integer SMALLER_VALEUR = 1 - 1;

    private static final Boolean DEFAULT_IS_REAL = false;
    private static final Boolean UPDATED_IS_REAL = true;

    private static final Boolean DEFAULT_IS_FIGEE = false;
    private static final Boolean UPDATED_IS_FIGEE = true;

    private static final Boolean DEFAULT_IS_REGULARISATION = false;
    private static final Boolean UPDATED_IS_REGULARISATION = true;

    @Autowired
    private ImputationRepository imputationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restImputationMockMvc;

    private Imputation imputation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImputationResource imputationResource = new ImputationResource(imputationRepository);
        this.restImputationMockMvc = MockMvcBuilders.standaloneSetup(imputationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Imputation createEntity(EntityManager em) {
        Imputation imputation = new Imputation()
            .date(DEFAULT_DATE)
            .valeur(DEFAULT_VALEUR)
            .isReal(DEFAULT_IS_REAL)
            .isFigee(DEFAULT_IS_FIGEE)
            .isRegularisation(DEFAULT_IS_REGULARISATION);
        return imputation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Imputation createUpdatedEntity(EntityManager em) {
        Imputation imputation = new Imputation()
            .date(UPDATED_DATE)
            .valeur(UPDATED_VALEUR)
            .isReal(UPDATED_IS_REAL)
            .isFigee(UPDATED_IS_FIGEE)
            .isRegularisation(UPDATED_IS_REGULARISATION);
        return imputation;
    }

    @BeforeEach
    public void initTest() {
        imputation = createEntity(em);
    }

    @Test
    @Transactional
    public void createImputation() throws Exception {
        int databaseSizeBeforeCreate = imputationRepository.findAll().size();

        // Create the Imputation
        restImputationMockMvc.perform(post("/api/imputations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imputation)))
            .andExpect(status().isCreated());

        // Validate the Imputation in the database
        List<Imputation> imputationList = imputationRepository.findAll();
        assertThat(imputationList).hasSize(databaseSizeBeforeCreate + 1);
        Imputation testImputation = imputationList.get(imputationList.size() - 1);
        assertThat(testImputation.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testImputation.getValeur()).isEqualTo(DEFAULT_VALEUR);
        assertThat(testImputation.isIsReal()).isEqualTo(DEFAULT_IS_REAL);
        assertThat(testImputation.isIsFigee()).isEqualTo(DEFAULT_IS_FIGEE);
        assertThat(testImputation.isIsRegularisation()).isEqualTo(DEFAULT_IS_REGULARISATION);
    }

    @Test
    @Transactional
    public void createImputationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imputationRepository.findAll().size();

        // Create the Imputation with an existing ID
        imputation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImputationMockMvc.perform(post("/api/imputations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imputation)))
            .andExpect(status().isBadRequest());

        // Validate the Imputation in the database
        List<Imputation> imputationList = imputationRepository.findAll();
        assertThat(imputationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllImputations() throws Exception {
        // Initialize the database
        imputationRepository.saveAndFlush(imputation);

        // Get all the imputationList
        restImputationMockMvc.perform(get("/api/imputations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(imputation.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].valeur").value(hasItem(DEFAULT_VALEUR)))
            .andExpect(jsonPath("$.[*].isReal").value(hasItem(DEFAULT_IS_REAL.booleanValue())))
            .andExpect(jsonPath("$.[*].isFigee").value(hasItem(DEFAULT_IS_FIGEE.booleanValue())))
            .andExpect(jsonPath("$.[*].isRegularisation").value(hasItem(DEFAULT_IS_REGULARISATION.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getImputation() throws Exception {
        // Initialize the database
        imputationRepository.saveAndFlush(imputation);

        // Get the imputation
        restImputationMockMvc.perform(get("/api/imputations/{id}", imputation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(imputation.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.valeur").value(DEFAULT_VALEUR))
            .andExpect(jsonPath("$.isReal").value(DEFAULT_IS_REAL.booleanValue()))
            .andExpect(jsonPath("$.isFigee").value(DEFAULT_IS_FIGEE.booleanValue()))
            .andExpect(jsonPath("$.isRegularisation").value(DEFAULT_IS_REGULARISATION.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingImputation() throws Exception {
        // Get the imputation
        restImputationMockMvc.perform(get("/api/imputations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImputation() throws Exception {
        // Initialize the database
        imputationRepository.saveAndFlush(imputation);

        int databaseSizeBeforeUpdate = imputationRepository.findAll().size();

        // Update the imputation
        Imputation updatedImputation = imputationRepository.findById(imputation.getId()).get();
        // Disconnect from session so that the updates on updatedImputation are not directly saved in db
        em.detach(updatedImputation);
        updatedImputation
            .date(UPDATED_DATE)
            .valeur(UPDATED_VALEUR)
            .isReal(UPDATED_IS_REAL)
            .isFigee(UPDATED_IS_FIGEE)
            .isRegularisation(UPDATED_IS_REGULARISATION);

        restImputationMockMvc.perform(put("/api/imputations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImputation)))
            .andExpect(status().isOk());

        // Validate the Imputation in the database
        List<Imputation> imputationList = imputationRepository.findAll();
        assertThat(imputationList).hasSize(databaseSizeBeforeUpdate);
        Imputation testImputation = imputationList.get(imputationList.size() - 1);
        assertThat(testImputation.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testImputation.getValeur()).isEqualTo(UPDATED_VALEUR);
        assertThat(testImputation.isIsReal()).isEqualTo(UPDATED_IS_REAL);
        assertThat(testImputation.isIsFigee()).isEqualTo(UPDATED_IS_FIGEE);
        assertThat(testImputation.isIsRegularisation()).isEqualTo(UPDATED_IS_REGULARISATION);
    }

    @Test
    @Transactional
    public void updateNonExistingImputation() throws Exception {
        int databaseSizeBeforeUpdate = imputationRepository.findAll().size();

        // Create the Imputation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImputationMockMvc.perform(put("/api/imputations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imputation)))
            .andExpect(status().isBadRequest());

        // Validate the Imputation in the database
        List<Imputation> imputationList = imputationRepository.findAll();
        assertThat(imputationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImputation() throws Exception {
        // Initialize the database
        imputationRepository.saveAndFlush(imputation);

        int databaseSizeBeforeDelete = imputationRepository.findAll().size();

        // Delete the imputation
        restImputationMockMvc.perform(delete("/api/imputations/{id}", imputation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Imputation> imputationList = imputationRepository.findAll();
        assertThat(imputationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Imputation.class);
        Imputation imputation1 = new Imputation();
        imputation1.setId(1L);
        Imputation imputation2 = new Imputation();
        imputation2.setId(imputation1.getId());
        assertThat(imputation1).isEqualTo(imputation2);
        imputation2.setId(2L);
        assertThat(imputation1).isNotEqualTo(imputation2);
        imputation1.setId(null);
        assertThat(imputation1).isNotEqualTo(imputation2);
    }
}
