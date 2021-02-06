import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MandarEmailComponent } from '../mandar-email/mandar-email.component';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class PrincipalComponent implements OnInit {
  returnUrl: string;
  error = '';
  usernameControl = new FormControl('', Validators.required);
  passwordControl = new FormControl('', Validators.required);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,

    public modal: NgbModal,

    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
  }
  openDialog(): void {
    const dialoRef = this.dialog.open(ModalLoginComponent, {});
    dialoRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
    // this.dialog.closeAll();
  }
  onSubmit(): void {
    this.authenticationService
      .login(this.usernameControl.value, this.passwordControl.value)
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.error = error;
        }
      );
  }
}
