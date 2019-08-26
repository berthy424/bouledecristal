import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BouleDeCristalSharedModule } from 'app/shared';
import {
  ImputationComponent,
  ImputationDetailComponent,
  ImputationUpdateComponent,
  ImputationDeletePopupComponent,
  ImputationDeleteDialogComponent,
  imputationRoute,
  imputationPopupRoute
} from './';

const ENTITY_STATES = [...imputationRoute, ...imputationPopupRoute];

@NgModule({
  imports: [BouleDeCristalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ImputationComponent,
    ImputationDetailComponent,
    ImputationUpdateComponent,
    ImputationDeleteDialogComponent,
    ImputationDeletePopupComponent
  ],
  entryComponents: [ImputationComponent, ImputationUpdateComponent, ImputationDeleteDialogComponent, ImputationDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BouleDeCristalImputationModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
