import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InewUser } from '../models/inew-user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as bcrypt from 'bcryptjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  pass: string;
  constructor(private http: HttpClient) {}

  addNewUser(user: InewUser): Observable<any> {
    this.pass = bcrypt.hashSync(user.password);
    return this.http.post<any>(
      `${environment.apiUrl}/api/Usuarios`,
      (user = {
        nombre: user.nombre,
        apellido: user.apellido,
        alias: user.alias,
        dni: user.dni,
        telefono: user.telefono,
        email: user.email,
        nomUsuario: user.nomUsuario,
        password: this.pass,
        idPais: user.idPais,
        idProvincia: user.idProvincia,
        idLocalidad: user.idLocalidad,
        calle: user.calle,
        altura: user.altura,
      })
    );
  }
}
