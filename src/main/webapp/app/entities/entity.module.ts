import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.BouleDeCristalClientModule)
      },
      {
        path: 'projet',
        loadChildren: () => import('./projet/projet.module').then(m => m.BouleDeCristalProjetModule)
      },
      {
        path: 'tache',
        loadChildren: () => import('./tache/tache.module').then(m => m.BouleDeCristalTacheModule)
      },
      {
        path: 'imputation',
        loadChildren: () => import('./imputation/imputation.module').then(m => m.BouleDeCristalImputationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BouleDeCristalEntityModule {}
