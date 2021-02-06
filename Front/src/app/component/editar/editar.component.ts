import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ComponenteMensageOkComponent } from '../componente-mensage-ok/componente-mensage-ok.component';
/* -----------------Interfaces -------------------------*/
import { ILocalidad } from '../../models/Ilocalidad';
import { IPais } from '../../models/Ipais';
import { IProvincia } from '../../models/Iprovincia';
import { InewUser } from 'src/app/models/inew-user';
import { IgetUser } from 'src/app/models/userget';

/* -----------------Servicios -------------------------*/
import { LocalidadService } from '../../service/localidad.service';
import { PaisService } from '../../service/pais.service';
import { ProvinciaService } from '../../service/provincia.service';
import { GetUserService } from '../../service/get-user.service';

/* -----------------Imports para porgramacioon reactiva -------------------------*/

import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
/* -----------------Ruteo -------------------------*/
import { ActivatedRoute, Router } from '@angular/router';
/* -----------------Tomar id del usuario -------------------------*/
import tokenGet from '../../helpers/get.id';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {
  selectedPais: IPais = { idPais: 0, nombre: 'Pais' };
  selectedProvincia: IProvincia = {
    idProvincia: 0,
    nombre: 'Provincia',
    idPais: 0,
  };
  localidades: ILocalidad[];
  paises: IPais[];
  provincias: IProvincia[];
  returnUrl: string;
  user: IgetUser;
  userId: number;

  singUpForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private localidadService: LocalidadService,
    private paisService: PaisService,
    private provinciaService: ProvinciaService,

    private getUserService: GetUserService,
    public dialog: MatDialog
  ) {
    this.singUpForm = this.builder.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cvu: ['', Validators.required],
      alias: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      nomUsuario: ['', Validators.required],
      password: ['', Validators.required],
      idProvincia: [Validators.required],
      idLocalidad: [Validators.required],
      idPais: [Validators.required],

      calle: ['', Validators.required],
      altura: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = Number(tokenGet());
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    /* -----------------Traemos los paices -------------------------*/
    this.paisService.getAll().subscribe(
      (paisesFromApi: IPais[]) => {
        this.paises = paisesFromApi;
      },
      (error) => console.error(error)
    );
    /* -----------------Traemos al usuario logeado -------------------------*/
    this.getUserService.getUser(this.userId).subscribe(
      (userFromApi: IgetUser) => {
        this.user = userFromApi;

        console.log(this.user);
      },
      (error) => console.error(error)
    );
  }
  openDialog(): void {
    const dialoRef = this.dialog.open(ComponenteMensageOkComponent, {});
    dialoRef.afterClosed().subscribe((res) => {
      console.log(res);
      this.dialog.closeAll();
    });
  }
  /* -----------------Traemos las provincias segun el pais elegido -------------------------*/
  onSelectPais(id: number): void {
    this.provinciaService.getPorPais(id).subscribe(
      (provinciasFromApi: IProvincia[]) => {
        this.provincias = provinciasFromApi;
      },
      (error) => console.error(error)
    );
  }
  /* -----------------Traemos las localidades segun la provincia elegida -------------------------*/
  onSelectProvincia(id: number): void {
    console.log(id);
    this.localidadService.getPorProvincia(id).subscribe(
      (localidadesFromApi: ILocalidad[]) => {
        this.localidades = localidadesFromApi;
        console.log(this.localidades);
      },
      (error) => console.error(error)
    );
  }
  /* -----------------Enviamos el usuario editado -------------------------*/
  onSubmit(value: InewUser): void {
    const userId = Number(tokenGet());
    console.log('jkdkdskdsfk', value);

    this.getUserService
      .updateUser(
        userId,
        (value = {
          nombre: value.nombre,
          apellido: value.apellido,

          alias: value.alias,
          dni: value.dni,
          telefono: value.telefono,
          email: value.email,
          nomUsuario: value.nomUsuario,
          password: this.user.password,
          idPais: value.idPais,
          idProvincia: value.idProvincia,
          idLocalidad: value.idLocalidad,
          calle: value.calle,
          altura: value.altura,
        })
      )
      .subscribe((user) => {
        console.log('hecho');
      });
    this.openDialog();
  }
}
