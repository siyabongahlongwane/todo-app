import { Component, OnInit } from '@angular/core';
import { GenericService } from '../services/generic.service';

@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.scss']
})
export class TaskviewComponent implements OnInit {

  constructor(private genericService: GenericService){}

  ngOnInit(): void {
    this.openTaskDialogFromService();  
  }

  openTaskDialogFromService(){
    let dialogData = {action: "add", text: {title: 'Add New Todo'}, task: {}};
    this.genericService.openTaskDialog(dialogData).subscribe((res: any) => {
      console.log(res);
    });
  }
}
