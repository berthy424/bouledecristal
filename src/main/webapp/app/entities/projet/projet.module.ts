import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BouleDeCristalSharedModule } from 'app/shared';
import {
  ProjetComponent,
  ProjetDetailComponent,
  ProjetUpdateComponent,
  ProjetDeletePopupComponent,
  ProjetDeleteDialogComponent,
  projetRoute,
  projetPopupRoute
} from './';

const ENTITY_STATES = [...projetRoute, ...projetPopupRoute];

@NgModule({
  imports: [BouleDeCristalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ProjetComponent, ProjetDetailComponent, ProjetUpdateComponent, ProjetDeleteDialogComponent, ProjetDeletePopupComponent],
  entryComponents: [ProjetComponent, ProjetUpdateComponent, ProjetDeleteDialogComponent, ProjetDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BouleDeCristalProjetModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
