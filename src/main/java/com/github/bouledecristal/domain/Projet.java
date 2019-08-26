package com.github.bouledecristal.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Projet.
 */
@Entity
@Table(name = "projet")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Projet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "annee")
    private Integer annee;

    @Column(name = "compte")
    private Integer compte;

    @ManyToOne
    @JsonIgnoreProperties("projets")
    private Client client;

    @OneToMany(mappedBy = "projet")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Tache> taches = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnnee() {
        return annee;
    }

    public Projet annee(Integer annee) {
        this.annee = annee;
        return this;
    }

    public void setAnnee(Integer annee) {
        this.annee = annee;
    }

    public Integer getCompte() {
        return compte;
    }

    public Projet compte(Integer compte) {
        this.compte = compte;
        return this;
    }

    public void setCompte(Integer compte) {
        this.compte = compte;
    }

    public Client getClient() {
        return client;
    }

    public Projet client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Set<Tache> getTaches() {
        return taches;
    }

    public Projet taches(Set<Tache> taches) {
        this.taches = taches;
        return this;
    }

    public Projet addTaches(Tache tache) {
        this.taches.add(tache);
        tache.setProjet(this);
        return this;
    }

    public Projet removeTaches(Tache tache) {
        this.taches.remove(tache);
        tache.setProjet(null);
        return this;
    }

    public void setTaches(Set<Tache> taches) {
        this.taches = taches;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Projet)) {
            return false;
        }
        return id != null && id.equals(((Projet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Projet{" +
            "id=" + getId() +
            ", annee=" + getAnnee() +
            ", compte=" + getCompte() +
            "}";
    }
}
