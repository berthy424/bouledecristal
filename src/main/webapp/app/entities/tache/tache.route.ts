import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Tache } from 'app/shared/model/tache.model';
import { TacheService } from './tache.service';
import { TacheComponent } from './tache.component';
import { TacheDetailComponent } from './tache-detail.component';
import { TacheUpdateComponent } from './tache-update.component';
import { TacheDeletePopupComponent } from './tache-delete-dialog.component';
import { ITache } from 'app/shared/model/tache.model';

@Injectable({ providedIn: 'root' })
export class TacheResolve implements Resolve<ITache> {
  constructor(private service: TacheService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITache> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Tache>) => response.ok),
        map((tache: HttpResponse<Tache>) => tache.body)
      );
    }
    return of(new Tache());
  }
}

export const tacheRoute: Routes = [
  {
    path: '',
    component: TacheComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bouleDeCristalApp.tache.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TacheDetailComponent,
    resolve: {
      tache: TacheResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bouleDeCristalApp.tache.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TacheUpdateComponent,
    resolve: {
      tache: TacheResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bouleDeCristalApp.tache.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TacheUpdateComponent,
    resolve: {
      tache: TacheResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bouleDeCristalApp.tache.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tachePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TacheDeletePopupComponent,
    resolve: {
      tache: TacheResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bouleDeCristalApp.tache.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
