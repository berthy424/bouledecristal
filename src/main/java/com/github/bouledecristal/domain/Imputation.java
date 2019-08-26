package com.github.bouledecristal.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Imputation.
 */
@Entity
@Table(name = "imputation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Imputation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private Instant date;

    @Column(name = "valeur")
    private Integer valeur;

    @Column(name = "is_real")
    private Boolean isReal;

    @Column(name = "is_figee")
    private Boolean isFigee;

    @Column(name = "is_regularisation")
    private Boolean isRegularisation;

    @ManyToOne
    @JsonIgnoreProperties("imputations")
    private Tache tache;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public Imputation date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Integer getValeur() {
        return valeur;
    }

    public Imputation valeur(Integer valeur) {
        this.valeur = valeur;
        return this;
    }

    public void setValeur(Integer valeur) {
        this.valeur = valeur;
    }

    public Boolean isIsReal() {
        return isReal;
    }

    public Imputation isReal(Boolean isReal) {
        this.isReal = isReal;
        return this;
    }

    public void setIsReal(Boolean isReal) {
        this.isReal = isReal;
    }

    public Boolean isIsFigee() {
        return isFigee;
    }

    public Imputation isFigee(Boolean isFigee) {
        this.isFigee = isFigee;
        return this;
    }

    public void setIsFigee(Boolean isFigee) {
        this.isFigee = isFigee;
    }

    public Boolean isIsRegularisation() {
        return isRegularisation;
    }

    public Imputation isRegularisation(Boolean isRegularisation) {
        this.isRegularisation = isRegularisation;
        return this;
    }

    public void setIsRegularisation(Boolean isRegularisation) {
        this.isRegularisation = isRegularisation;
    }

    public Tache getTache() {
        return tache;
    }

    public Imputation tache(Tache tache) {
        this.tache = tache;
        return this;
    }

    public void setTache(Tache tache) {
        this.tache = tache;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Imputation)) {
            return false;
        }
        return id != null && id.equals(((Imputation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Imputation{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", valeur=" + getValeur() +
            ", isReal='" + isIsReal() + "'" +
            ", isFigee='" + isIsFigee() + "'" +
            ", isRegularisation='" + isIsRegularisation() + "'" +
            "}";
    }
}
