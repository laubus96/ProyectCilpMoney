import { Component, OnInit, Inject } from '@angular/core';
import { ModalIngresoDineroComponent } from '../modal-ingreso-dinero/modal-ingreso-dinero.component';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';

/* -----------------Trae  para hacer el modal -------------------------*/
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/* -----------------Servicios -------------------------*/
import { SaldoService } from '../../service/saldo.service';
import { MovimientosService } from '../../service/movimientos.service';
import { GetUserService } from '../../service/get-user.service';
/* -----------------Interfaces -------------------------*/
import { ISaldo, Imonto } from '../../models/saldo';
import { IgetUser } from '../../models/userget';
import { IMovi } from '../../models/moviminetos';
import { ImovMostrar } from '../../models/movMostrar';
/* -----------------Tomar id del usuario -------------------------*/
import tokenGet from '../../helpers/get.id';
/* -----------------Ruteo -------------------------*/
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  saldosList: ISaldo[];
  movimientosList: IMovi[];
  movMostrarList: ImovMostrar[];
  user: number;
  upSaldoForm: FormGroup;
  saldoActual: number;
  returnUrl: string;
  cvuUser: number;
  numId: number;
  movimientos = false;
  idTipoMov: number;
  p = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private saldoService: SaldoService,
    private movimientoService: MovimientosService,
    private getUserService: GetUserService,
    private builder: FormBuilder,
    public modal: NgbModal,

    public dialog: MatDialog
  ) {
    this.upSaldoForm = this.builder.group({
      monto: ['', Validators.required],
    });
  }

  buscarSaldo(): void {
    /* -----------------Trae el saldos y toma  el id del saldo y el saldo actual -------------------------*/
    this.user = Number(tokenGet());
    this.saldoService.getSaldo().subscribe(
      (saldoFormApi: ISaldo[]) => {
        this.saldosList = saldoFormApi;
        console.log(this.saldosList);
        for (let i = 0; i < this.saldosList.length; i++) {
          if (this.user === this.saldosList[i].idUsuario) {
            this.saldoActual = this.saldosList[i].monto;
            this.numId = this.saldosList[i].idSaldo;
          }
        }
      },
      (error) => console.error(error)
    );
  }
  ngOnInit(): void {
    /* -----------------Llama a la funcion buscarsaldo() para actualizar -------------------------*/
    this.buscarSaldo();
  }
  openDialog(): void {
    const dialoRef = this.dialog.open(ModalIngresoDineroComponent, {});
    dialoRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }

  /* ----------------- Trae los datos para mostrar en la tabla movimientos -------------------------*/
  verMovimientos(): void {
    this.user = Number(tokenGet());

    this.movimientoService
      .getMoviminetos(this.user)
      .subscribe((movimFormApi: IMovi[]) => {
        this.movimientosList = movimFormApi;
      });
    this.movimientos = true;
  }
  onSubmit(value: Imonto): void {
    this.idTipoMov = 1;
    this.user = Number(tokenGet());
    if (this.saldosList.length > 0) {
      this.saldoService.updateSaldo(this.numId, value).subscribe((saldo) => {
        console.log();
      });
      this.movimientoService
        .newMovimiento(this.user, value, this.idTipoMov)
        .subscribe((movimiento) => {
          this.buscarSaldo();
        });
    } else {
      console.log('yata');
    }
  }
}
