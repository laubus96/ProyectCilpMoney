import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteMensageOkComponent } from './componente-mensage-ok.component';

describe('ComponenteMensageOkComponent', () => {
  let component: ComponenteMensageOkComponent;
  let fixture: ComponentFixture<ComponenteMensageOkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteMensageOkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteMensageOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
