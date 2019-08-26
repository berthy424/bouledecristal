import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProjet } from 'app/shared/model/projet.model';
import { AccountService } from 'app/core';
import { ProjetService } from './projet.service';

@Component({
  selector: 'jhi-projet',
  templateUrl: './projet.component.html'
})
export class ProjetComponent implements OnInit, OnDestroy {
  projets: IProjet[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected projetService: ProjetService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.projetService
      .query()
      .pipe(
        filter((res: HttpResponse<IProjet[]>) => res.ok),
        map((res: HttpResponse<IProjet[]>) => res.body)
      )
      .subscribe(
        (res: IProjet[]) => {
          this.projets = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInProjets();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProjet) {
    return item.id;
  }

  registerChangeInProjets() {
    this.eventSubscriber = this.eventManager.subscribe('projetListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
