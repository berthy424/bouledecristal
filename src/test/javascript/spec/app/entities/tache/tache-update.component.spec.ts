/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { BouleDeCristalTestModule } from '../../../test.module';
import { TacheUpdateComponent } from 'app/entities/tache/tache-update.component';
import { TacheService } from 'app/entities/tache/tache.service';
import { Tache } from 'app/shared/model/tache.model';

describe('Component Tests', () => {
  describe('Tache Management Update Component', () => {
    let comp: TacheUpdateComponent;
    let fixture: ComponentFixture<TacheUpdateComponent>;
    let service: TacheService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BouleDeCristalTestModule],
        declarations: [TacheUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TacheUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TacheUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TacheService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tache(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tache();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
