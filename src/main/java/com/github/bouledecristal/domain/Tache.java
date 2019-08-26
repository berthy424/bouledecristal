package com.github.bouledecristal.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Tache.
 */
@Entity
@Table(name = "tache")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tache implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "label")
    private String label;

    @Column(name = "artefact")
    private Integer artefact;

    @ManyToOne
    @JsonIgnoreProperties("taches")
    private Projet projet;

    @OneToMany(mappedBy = "tache")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Imputation> imputations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public Tache label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Integer getArtefact() {
        return artefact;
    }

    public Tache artefact(Integer artefact) {
        this.artefact = artefact;
        return this;
    }

    public void setArtefact(Integer artefact) {
        this.artefact = artefact;
    }

    public Projet getProjet() {
        return projet;
    }

    public Tache projet(Projet projet) {
        this.projet = projet;
        return this;
    }

    public void setProjet(Projet projet) {
        this.projet = projet;
    }

    public Set<Imputation> getImputations() {
        return imputations;
    }

    public Tache imputations(Set<Imputation> imputations) {
        this.imputations = imputations;
        return this;
    }

    public Tache addImputations(Imputation imputation) {
        this.imputations.add(imputation);
        imputation.setTache(this);
        return this;
    }

    public Tache removeImputations(Imputation imputation) {
        this.imputations.remove(imputation);
        imputation.setTache(null);
        return this;
    }

    public void setImputations(Set<Imputation> imputations) {
        this.imputations = imputations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tache)) {
            return false;
        }
        return id != null && id.equals(((Tache) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Tache{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", artefact=" + getArtefact() +
            "}";
    }
}
