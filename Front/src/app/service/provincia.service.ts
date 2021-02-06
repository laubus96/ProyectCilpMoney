import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProvinciaService {
  constructor(private http: HttpClient) {}
  getPorPais(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/Provincias/${id}`);
  }
}
