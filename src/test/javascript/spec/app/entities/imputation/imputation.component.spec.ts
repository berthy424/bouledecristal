/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BouleDeCristalTestModule } from '../../../test.module';
import { ImputationComponent } from 'app/entities/imputation/imputation.component';
import { ImputationService } from 'app/entities/imputation/imputation.service';
import { Imputation } from 'app/shared/model/imputation.model';

describe('Component Tests', () => {
  describe('Imputation Management Component', () => {
    let comp: ImputationComponent;
    let fixture: ComponentFixture<ImputationComponent>;
    let service: ImputationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BouleDeCristalTestModule],
        declarations: [ImputationComponent],
        providers: []
      })
        .overrideTemplate(ImputationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ImputationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImputationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Imputation(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.imputations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
