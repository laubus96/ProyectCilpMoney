import { Component, OnInit, Inject } from '@angular/core';
import { ComponenteMensageOkComponent } from '../componente-mensage-ok/componente-mensage-ok.component';
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
  selector: 'app-modal-ingreso-dinero',
  templateUrl: './modal-ingreso-dinero.component.html',
  styleUrls: ['./modal-ingreso-dinero.component.css'],
})
export class ModalIngresoDineroComponent implements OnInit {
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
    private saldoService: SaldoService,
    private movimientoService: MovimientosService,
    private getUserService: GetUserService,
    private router: Router,
    private route: ActivatedRoute,
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<ModalIngresoDineroComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public massage: string
  ) {
    this.upSaldoForm = this.builder.group({
      monto: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.buscarSaldo();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
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
  openDialog(): void {
    const dialoRef = this.dialog.open(ComponenteMensageOkComponent, {});
    dialoRef.afterClosed().subscribe((res) => {
      console.log(res);
      this.buscarSaldo();
      this.dialog.closeAll();
      this.buscarSaldo();
    });
  }
  /* -----------------Manda el saldo a sumar y manda el movimiento nuevo -------------------------*/
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
    this.openDialog();
  }
}
