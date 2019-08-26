import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProjet } from 'app/shared/model/projet.model';

@Component({
  selector: 'jhi-projet-detail',
  templateUrl: './projet-detail.component.html'
})
export class ProjetDetailComponent implements OnInit {
  projet: IProjet;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ projet }) => {
      this.projet = projet;
    });
  }

  previousState() {
    window.history.back();
  }
}
