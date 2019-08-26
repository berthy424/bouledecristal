import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BouleDeCristalSharedModule } from 'app/shared';
import {
  TacheComponent,
  TacheDetailComponent,
  TacheUpdateComponent,
  TacheDeletePopupComponent,
  TacheDeleteDialogComponent,
  tacheRoute,
  tachePopupRoute
} from './';

const ENTITY_STATES = [...tacheRoute, ...tachePopupRoute];

@NgModule({
  imports: [BouleDeCristalSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TacheComponent, TacheDetailComponent, TacheUpdateComponent, TacheDeleteDialogComponent, TacheDeletePopupComponent],
  entryComponents: [TacheComponent, TacheUpdateComponent, TacheDeleteDialogComponent, TacheDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BouleDeCristalTacheModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
