import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandarEmailComponent } from './mandar-email.component';

describe('MandarEmailComponent', () => {
  let component: MandarEmailComponent;
  let fixture: ComponentFixture<MandarEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandarEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandarEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
