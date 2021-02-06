import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { User } from './models/user';

import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }
  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
  editar(): void {
    this.router.navigate(['/editar']);
  }
}
