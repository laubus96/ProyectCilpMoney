import { Component, OnInit, Inject } from '@angular/core';
import { Iemail } from '../../models/inew-user';
import { ComponenteMensageOkComponent } from '../componente-mensage-ok/componente-mensage-ok.component';
import { RecuperarContraseñaService } from '../../service/recuperar-contraseña.service';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mandar-email',
  templateUrl: './mandar-email.component.html',
  styleUrls: ['./mandar-email.component.css'],
})
export class MandarEmailComponent implements OnInit {
  private isValidPatter = /\S+@\S+\.\S+/;
  upMail: FormGroup;

  constructor(
    private recuContraService: RecuperarContraseñaService,
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<MandarEmailComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public massage: string
  ) {
    this.upMail = this.builder.group({
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
  onMail(value: Iemail): void {
    this.recuContraService.mandarMail(value).subscribe((email) => {
      console.log(email);
    });

    this.openDialog();
  }
}
