import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteContruccionComponent } from './componente-contruccion.component';

describe('ComponenteContruccionComponent', () => {
  let component: ComponenteContruccionComponent;
  let fixture: ComponentFixture<ComponenteContruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteContruccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteContruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
