import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenericService } from '../services/generic.service';
import { Todo } from '../taskview/taskview.component';

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss']
})
export class DynamicDialogComponent {
  priorities: string[] = ['Low', 'Average', 'Urgent'];
  dataModel: Todo = {
    id: '',
    taskName: '',
    dueDate: 0,
    priority: '',
    status: ''
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DynamicDialogComponent>, private genericService: GenericService){
    Object.assign(this.dataModel, data.task);
  }

  closeDialog(form: NgForm){
    if(form.invalid) this.genericService.openSnackbar('Please enter all required fields', ['red-bg', 'white-color']);
    else {
      form.value.id = form.value.id ? form.value.id : new Date().getTime().toString();
      form.value.status = this.data.status ? this.data.status : 'Pending';
      this.dialogRef.close(form.value);
    };
  }
}
