/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { BouleDeCristalTestModule } from '../../../test.module';
import { TacheDeleteDialogComponent } from 'app/entities/tache/tache-delete-dialog.component';
import { TacheService } from 'app/entities/tache/tache.service';

describe('Component Tests', () => {
  describe('Tache Management Delete Component', () => {
    let comp: TacheDeleteDialogComponent;
    let fixture: ComponentFixture<TacheDeleteDialogComponent>;
    let service: TacheService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BouleDeCristalTestModule],
        declarations: [TacheDeleteDialogComponent]
      })
        .overrideTemplate(TacheDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TacheDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TacheService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
