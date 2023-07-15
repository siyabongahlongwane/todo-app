import { Component, OnInit } from '@angular/core';
import { GenericService } from '../services/generic.service';
export interface Todo {
  taskName: string,
  priority: string,
  status: string
}

@Component({
  selector: 'app-taskview',
  templateUrl: './taskview.component.html',
  styleUrls: ['./taskview.component.scss']
})
export class TaskviewComponent implements OnInit {
  todos!: Todo[];
  constructor(private genericService: GenericService){}

  ngOnInit(): void {
    this.openTaskDialogFromService();
    this.genericService.todos$.subscribe((todos: Todo[]) => {
      this.todos = todos;
      console.log(this.todos);
    });
  }

  openTaskDialogFromService(){
    let dialogData = {action: "add", text: {title: 'Add New Todo', buttonText: 'Add Todo'}, task: {}};
    this.genericService.openTaskDialog(dialogData).subscribe((todo: any) => {
      if(todo){
        this.genericService.updateTodos([...this.todos, todo])
      }
    });
  }
}
