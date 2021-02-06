import { TestBed } from '@angular/core/testing';

import { TrasferenciaService } from './trasferencia.service';

describe('TrasferenciaService', () => {
  let service: TrasferenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrasferenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
