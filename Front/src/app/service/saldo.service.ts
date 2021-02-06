import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Imonto } from '../models/saldo';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaldoService {
  constructor(private http: HttpClient) {}

  getSaldo(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/Saldoes`);
  }

  newSaldo(id: string, saldo: Imonto): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/Saldoes/${id}`,
      saldo
    );
  }

  updateSaldo(id: number, saldo: Imonto): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/Saldoes/${id}`, saldo);
  }
  updateSaldoNumber(id: number, saldo: number): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/Saldoes/${id}`, saldo);
  }
}
