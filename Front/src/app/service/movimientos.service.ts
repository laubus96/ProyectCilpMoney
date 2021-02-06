import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Imonto } from '../models/saldo';
import { InewMov } from '../models/moviminetos';

@Injectable({
  providedIn: 'root',
})
export class MovimientosService {
  movimiento: InewMov;
  constructor(private http: HttpClient) {}

  newMovimiento(
    id: number,
    monto: Imonto,
    idTipoMoiv: number
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/Movimientoes/${id}`,
      (this.movimiento = {
        monto: monto.monto,
        idTipoMov: idTipoMoiv,
      })
    );
  }
  newMovimientoNumber(
    id: number,
    montoS: number,
    idTipoMoiv: number
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/Movimientoes/${id}`,
      (this.movimiento = {
        monto: montoS,
        idTipoMov: idTipoMoiv,
      })
    );
  }

  getMoviminetos(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/Movimientoes/${id}`);
  }
}
