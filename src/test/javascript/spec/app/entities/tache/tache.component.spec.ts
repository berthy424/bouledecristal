/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BouleDeCristalTestModule } from '../../../test.module';
import { TacheComponent } from 'app/entities/tache/tache.component';
import { TacheService } from 'app/entities/tache/tache.service';
import { Tache } from 'app/shared/model/tache.model';

describe('Component Tests', () => {
  describe('Tache Management Component', () => {
    let comp: TacheComponent;
    let fixture: ComponentFixture<TacheComponent>;
    let service: TacheService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BouleDeCristalTestModule],
        declarations: [TacheComponent],
        providers: []
      })
        .overrideTemplate(TacheComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TacheComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TacheService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Tache(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.taches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
