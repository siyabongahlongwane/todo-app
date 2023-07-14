import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private dialog: MatDialog) { }

  openTaskDialog(data: any){
    return this.dialog.open(DynamicDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
      width: '500px',
      height: '450px',
      data: data,
      panelClass: 'dynamic-dialog'
    }).afterClosed();
  }
}
