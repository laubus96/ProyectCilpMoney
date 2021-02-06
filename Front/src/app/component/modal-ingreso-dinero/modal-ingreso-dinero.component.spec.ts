import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIngresoDineroComponent } from './modal-ingreso-dinero.component';

describe('ModalIngresoDineroComponent', () => {
  let component: ModalIngresoDineroComponent;
  let fixture: ComponentFixture<ModalIngresoDineroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalIngresoDineroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIngresoDineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
