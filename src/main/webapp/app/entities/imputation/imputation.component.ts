import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IImputation } from 'app/shared/model/imputation.model';
import { AccountService } from 'app/core';
import { ImputationService } from './imputation.service';

@Component({
  selector: 'jhi-imputation',
  templateUrl: './imputation.component.html'
})
export class ImputationComponent implements OnInit, OnDestroy {
  imputations: IImputation[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected imputationService: ImputationService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.imputationService
      .query()
      .pipe(
        filter((res: HttpResponse<IImputation[]>) => res.ok),
        map((res: HttpResponse<IImputation[]>) => res.body)
      )
      .subscribe(
        (res: IImputation[]) => {
          this.imputations = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInImputations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IImputation) {
    return item.id;
  }

  registerChangeInImputations() {
    this.eventSubscriber = this.eventManager.subscribe('imputationListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
