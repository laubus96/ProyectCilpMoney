import { Component, OnInit } from '@angular/core';
/* -----------------Imports para porgramacioon reactiva -------------------------*/
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
/* -----------------Interfaces -------------------------*/
import { Itransferecia } from 'src/app/models/transferencia';
import { IgetDestinos, InewDestino } from '../../models/inew-user';
/* -----------------Servicios -------------------------*/
import { TrasferenciaService } from '../../service/trasferencia.service';
import { SaldoService } from '../../service/saldo.service';
import { GetUserService } from '../../service/get-user.service';
import { MovimientosService } from '../../service/movimientos.service';
/* -----------------Tomar id del usuario -------------------------*/
import tokenGet from '../../helpers/get.id';
/* -----------------Para hacer el modal -------------------------*/
import { MatDialog } from '@angular/material/dialog';
import { ModalDestinoComponent } from '../modal-destino/modal-destino.component';
import { ComponenteMensageOkComponent } from '../componente-mensage-ok/componente-mensage-ok.component';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css'],
})
export class TransferenciaComponent implements OnInit {
  private isValidPatter = /\S+@\S+\.\S+/;
  upTransferencia: FormGroup;
  upDestino: FormGroup;
  userId: number;
  destinoId: number;
  idTipoMov: number;
  listDestino: IgetDestinos[];
  selectedDestino: IgetDestinos = {
    idUserOrigen: 0,
    alias: '',
    nombre: '',
    apellido: '',
    email: '',
    idUserDestino: 0,
  };

  constructor(
    private buider: FormBuilder,
    private trasferenciaService: TrasferenciaService,
    private saldoService: SaldoService,
    private movimientosService: MovimientosService,
    private getUserService: GetUserService,

    public dialog: MatDialog
  ) {
    this.upTransferencia = this.buider.group({
      idUserDestino: ['', Validators.required],
      monto: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.pattern(this.isValidPatter)],
      ],
    });
  }
  buscarAlias(): void {
    this.userId = Number(tokenGet());
    this.getUserService.getidDestino(this.userId).subscribe(
      (destinosFromApi: IgetDestinos[]) => {
        this.listDestino = destinosFromApi;
        console.log(this.listDestino);
      },
      (error) => console.error(error)
    );
  }

  ngOnInit(): void {
    /* -----------------Trae los usuarios para mandar dinero  -------------------------*/
    this.buscarAlias();
  }
  /* -----------------Abre le modal -------------------------*/
  openDialog(): void {
    const dialoRef = this.dialog.open(ModalDestinoComponent, {});
    dialoRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }
  openDialogMensage(): void {
    const dialoRef = this.dialog.open(ComponenteMensageOkComponent, {});
    dialoRef.afterClosed().subscribe((res) => {
      console.log(res);
      this.dialog.closeAll();
    });
  }
  /* -----------------Crea el usuario destino  nuevo -------------------------*/
  onDestino(value: InewDestino): void {
    this.userId = Number(tokenGet());
    this.getUserService
      .newDestino(value, this.userId)
      .subscribe((destino) => console.log(destino));
    this.buscarAlias();
  }
  /* -----------------Toma el id del usario destino -------------------------*/
  onSelectAlias(id: number): void {
    this.destinoId = id;
  }
  /* -----------------Hace la tranferencia -------------------------*/
  onSubmit(value: Itransferecia): void {
    this.idTipoMov = 3;
    this.userId = Number(tokenGet());
    /* -----------------Nueva tranferencia -------------------------*/
    this.trasferenciaService
      .newTrasferencia(value, this.userId)
      .subscribe((trasferencia) => {
        console.log(trasferencia);
      });
    // this.trasferenciaService
    //   .newTrasferenciasaldo(value, this.userId)
    //   .subscribe((trasferencia) => {
    //     console.log(trasferencia);
    //   });
    /* -----------------Suma el saldo del usuario destino -------------------------*/
    // this.saldoService
    //   .updateSaldoNumber(this.destinoId, value.monto)
    //   .subscribe((saldo) => console.log(saldo));
    /* -----------------Resta el saldo en el usuario actual -------------------------*/
    // this.saldoService
    //   .updateSaldoNumber(this.userId, value.monto)
    //   .subscribe((saldo) => console.log(saldo));
    /* -----------------Manda para crear el nuevo movimiento -------------------------*/
    this.movimientosService
      .newMovimientoNumber(this.userId, value.monto, this.idTipoMov)
      .subscribe((movientos) => console.log(movientos));
    this.openDialogMensage();
  }
}
