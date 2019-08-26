import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITache, Tache } from 'app/shared/model/tache.model';
import { TacheService } from './tache.service';
import { IProjet } from 'app/shared/model/projet.model';
import { ProjetService } from 'app/entities/projet';

@Component({
  selector: 'jhi-tache-update',
  templateUrl: './tache-update.component.html'
})
export class TacheUpdateComponent implements OnInit {
  isSaving: boolean;

  projets: IProjet[];

  editForm = this.fb.group({
    id: [],
    label: [],
    artefact: [],
    projet: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tacheService: TacheService,
    protected projetService: ProjetService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tache }) => {
      this.updateForm(tache);
    });
    this.projetService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProjet[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProjet[]>) => response.body)
      )
      .subscribe((res: IProjet[]) => (this.projets = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tache: ITache) {
    this.editForm.patchValue({
      id: tache.id,
      label: tache.label,
      artefact: tache.artefact,
      projet: tache.projet
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tache = this.createFromForm();
    if (tache.id !== undefined) {
      this.subscribeToSaveResponse(this.tacheService.update(tache));
    } else {
      this.subscribeToSaveResponse(this.tacheService.create(tache));
    }
  }

  private createFromForm(): ITache {
    return {
      ...new Tache(),
      id: this.editForm.get(['id']).value,
      label: this.editForm.get(['label']).value,
      artefact: this.editForm.get(['artefact']).value,
      projet: this.editForm.get(['projet']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITache>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProjetById(index: number, item: IProjet) {
    return item.id;
  }
}
