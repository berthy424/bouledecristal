import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BouleDeCristalSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [BouleDeCristalSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [BouleDeCristalSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BouleDeCristalSharedModule {
  static forRoot() {
    return {
      ngModule: BouleDeCristalSharedModule
    };
  }
}
