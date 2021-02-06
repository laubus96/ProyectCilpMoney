import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { InewDestino } from '../../models/inew-user';
import tokenGet from '../../helpers/get.id';
import { GetUserService } from '../../service/get-user.service';
import { ComponenteMensageOkComponent } from '../componente-mensage-ok/componente-mensage-ok.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-modal-destino',
  templateUrl: './modal-destino.component.html',
  styleUrls: ['./modal-destino.component.css'],
})
export class ModalDestinoComponent implements OnInit {
  private isValidPatter = /\S+@\S+\.\S+/;
  upDestino: FormGroup;
  userId: number;
  constructor(
    private buider: FormBuilder,
    private getUserService: GetUserService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalDestinoComponent>,
    @Inject(MAT_DIALOG_DATA) public massage: string
  ) {
    this.upDestino = this.buider.group({
      alias: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.pattern(this.isValidPatter)],
      ],
    });
  }

  ngOnInit(): void {}
  openDialog(): void {
    const dialoRef = this.dialog.open(ComponenteMensageOkComponent, {});
    dialoRef.afterClosed().subscribe((res) => {
      console.log(res);
      this.dialog.closeAll();
    });
  }
  onDestino(value: InewDestino): void {
    this.userId = Number(tokenGet());
    console.log(this.userId);
    this.getUserService
      .newDestino(
        (value = {
          alias: value.alias,
          nombre: value.nombre,

          apellido: value.apellido,
          email: value.email,
        }),
        this.userId
      )
      .subscribe((destino) => console.log(destino));
    this.openDialog();
  }
}
