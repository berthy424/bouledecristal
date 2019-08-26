import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITache } from 'app/shared/model/tache.model';
import { AccountService } from 'app/core';
import { TacheService } from './tache.service';

@Component({
  selector: 'jhi-tache',
  templateUrl: './tache.component.html'
})
export class TacheComponent implements OnInit, OnDestroy {
  taches: ITache[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tacheService: TacheService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tacheService
      .query()
      .pipe(
        filter((res: HttpResponse<ITache[]>) => res.ok),
        map((res: HttpResponse<ITache[]>) => res.body)
      )
      .subscribe(
        (res: ITache[]) => {
          this.taches = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTaches();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITache) {
    return item.id;
  }

  registerChangeInTaches() {
    this.eventSubscriber = this.eventManager.subscribe('tacheListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
