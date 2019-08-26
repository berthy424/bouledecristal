import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Projet } from 'app/shared/model/projet.model';
import { ProjetService } from './projet.service';
import { ProjetComponent } from './projet.component';
import { ProjetDetailComponent } from './projet-detail.component';
import { ProjetUpdateComponent } from './projet-update.component';
import { ProjetDeletePopupComponent } from './projet-delete-dialog.component';
import { IProjet } from 'app/shared/model/projet.model';

@Injectable({ providedIn: 'root' })
export class ProjetResolve implements Resolve<IProjet> {
  constructor(private service: ProjetService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProjet> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Projet>) => response.ok),
        map((projet: HttpResponse<Projet>) => projet.body)
      );
    }
    return of(new Projet());
  }
}

export const projetRoute: Routes = [
  {
    path: '',
    component: ProjetComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bouleDeCristalApp.projet.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProjetDetailComponent,
    resolve: {
      projet: ProjetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bouleDeCristalApp.projet.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProjetUpdateComponent,
    resolve: {
      projet: ProjetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bouleDeCristalApp.projet.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProjetUpdateComponent,
    resolve: {
      projet: ProjetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bouleDeCristalApp.projet.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const projetPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProjetDeletePopupComponent,
    resolve: {
      projet: ProjetResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'bouleDeCristalApp.projet.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
