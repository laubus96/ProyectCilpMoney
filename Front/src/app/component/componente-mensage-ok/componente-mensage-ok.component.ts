import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';

@Component({
  selector: 'app-componente-mensage-ok',
  templateUrl: './componente-mensage-ok.component.html',
  styleUrls: ['./componente-mensage-ok.component.css'],
})
export class ComponenteMensageOkComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
}
