import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Task {
  taskName: string,
  priority: string,
  status: string
}
@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss']
})
export class DynamicDialogComponent {
  priorities: string[] = ['Low', 'Average', 'Medium'];
  dataModel: Task = {
    taskName: "",
    priority: "",
    status: ""
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
    Object.assign(this.dataModel, data.task);
    console.log(this.dataModel, this.data)
  }
  
}
