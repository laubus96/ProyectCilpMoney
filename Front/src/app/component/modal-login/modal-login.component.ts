import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { MandarEmailComponent } from '../mandar-email/mandar-email.component';
import { Ilogin } from '../../models/inew-user';
import { MatFormFieldModule } from '@angular/material/form-field';

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

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css'],
})
export class ModalLoginComponent implements OnInit {
  usernameControl = new FormControl('', Validators.required);
  passwordControl = new FormControl('', Validators.required);
  returnUrl: string;
  error = '';
  uplogin: FormGroup;
  private isValidPatter = /\S+@\S+\.\S+/;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,

    public dialog: MatDialog,
    private builder: FormBuilder
  ) {
    this.uplogin = this.builder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(8)]],
    });
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
  }
  openDialog(): void {
    const dialoRef = this.dialog.open(MandarEmailComponent, {});
    dialoRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
    // this.dialog.closeAll();
  }
  onSubmit(value: Ilogin): void {
    this.authenticationService.login(value.username, value.password).subscribe(
      (data) => {
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        this.error = error;
      }
    );
    this.dialog.closeAll();
  }
  irRegistro(): void {
    this.dialog.closeAll();
  }
}
