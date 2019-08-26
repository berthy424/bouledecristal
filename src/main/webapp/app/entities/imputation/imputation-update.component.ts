import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IImputation, Imputation } from 'app/shared/model/imputation.model';
import { ImputationService } from './imputation.service';
import { ITache } from 'app/shared/model/tache.model';
import { TacheService } from 'app/entities/tache';

@Component({
  selector: 'jhi-imputation-update',
  templateUrl: './imputation-update.component.html'
})
export class ImputationUpdateComponent implements OnInit {
  isSaving: boolean;

  taches: ITache[];

  editForm = this.fb.group({
    id: [],
    date: [],
    valeur: [],
    isReal: [],
    isFigee: [],
    isRegularisation: [],
    tache: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected imputationService: ImputationService,
    protected tacheService: TacheService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ imputation }) => {
      this.updateForm(imputation);
    });
    this.tacheService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITache[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITache[]>) => response.body)
      )
      .subscribe((res: ITache[]) => (this.taches = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(imputation: IImputation) {
    this.editForm.patchValue({
      id: imputation.id,
      date: imputation.date != null ? imputation.date.format(DATE_TIME_FORMAT) : null,
      valeur: imputation.valeur,
      isReal: imputation.isReal,
      isFigee: imputation.isFigee,
      isRegularisation: imputation.isRegularisation,
      tache: imputation.tache
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const imputation = this.createFromForm();
    if (imputation.id !== undefined) {
      this.subscribeToSaveResponse(this.imputationService.update(imputation));
    } else {
      this.subscribeToSaveResponse(this.imputationService.create(imputation));
    }
  }

  private createFromForm(): IImputation {
    return {
      ...new Imputation(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      valeur: this.editForm.get(['valeur']).value,
      isReal: this.editForm.get(['isReal']).value,
      isFigee: this.editForm.get(['isFigee']).value,
      isRegularisation: this.editForm.get(['isRegularisation']).value,
      tache: this.editForm.get(['tache']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImputation>>) {
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

  trackTacheById(index: number, item: ITache) {
    return item.id;
  }
}
