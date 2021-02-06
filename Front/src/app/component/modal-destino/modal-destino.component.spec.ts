import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDestinoComponent } from './modal-destino.component';

describe('ModalDestinoComponent', () => {
  let component: ModalDestinoComponent;
  let fixture: ComponentFixture<ModalDestinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDestinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
