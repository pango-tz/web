import { Component, Inject } from '@angular/core';
import {MD_DIALOG_DATA, DialogPosition} from '@angular/material';
import { ErrorDialog } from '../models';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent {

  constructor( @Inject(MD_DIALOG_DATA) public errorDialog: ErrorDialog) {

  }

}
