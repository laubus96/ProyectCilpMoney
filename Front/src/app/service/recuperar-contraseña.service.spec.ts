import { TestBed } from '@angular/core/testing';

import { RecuperarContraseñaService } from './recuperar-contraseña.service';

describe('RecuperarContraseñaService', () => {
  let service: RecuperarContraseñaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperarContraseñaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
