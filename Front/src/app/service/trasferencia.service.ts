import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Itransferecia } from '../models/transferencia';

@Injectable({
  providedIn: 'root',
})
export class TrasferenciaService {
  constructor(private http: HttpClient) {}

  // newTrasferenciasaldo(value: Itransferecia, userId: number): Observable<any> {
  //   return this.http.post<any>(
  //     `${environment.apiUrl}/api/SaldoTransferencia/${userId}`,
  //     (value = {
  //       email: value.email,
  //       monto: value.monto,
  //       idUserDestino: value.idUserDestino,
  //     })
  //   );
  // }
  newTrasferencia(value: Itransferecia, userId: number): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/Transferencias/${userId}`,
      (value = {
        email: value.email,
        monto: value.monto,
        idUserDestino: value.idUserDestino,
      })
    );
  }
}
