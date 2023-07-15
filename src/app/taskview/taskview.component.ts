import { Component, OnInit } from '@angular/core';
import { GenericService } from '../services/generic.service';
export interface Todo {
  id: string;
  taskName: string,
  dueDate: number,
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
  uncompletedTasks: number = 0;
  taskHeaders: any[] = [
    {
      label: 'Task Name',
      flex: 31
    },
    {
      label: 'Task Status',
      flex: 15
    },
    {
      label: 'Importance',
      flex: 15
    },
    {
      label: 'Due Date',
      flex: 15
    },
    {
      label: 'Action',
      flex: 15
    }
  ]
  constructor(private genericService: GenericService){}

  ngOnInit(): void {
    this.fetchAllTasks();
  }

  fetchAllTasks(){
    this.genericService.todos$.subscribe((todos: Todo[]) => {
      this.todos = todos;
      this.uncompletedTasks = this.todos.filter((todo: Todo) => todo.status == 'Pending')?.length;
    });
  }

  openTaskDialogFromService(){
    let dialogData = {action: "add", text: {title: 'Add New Task', buttonText: 'Add Task'}, task: {}};
    this.genericService.openTaskDialog(dialogData).subscribe((todo: any) => {
      if(todo){
        this.genericService.updateTodos('add', todo);
        this.genericService.openSnackbar('Task Added Successfully', ['green-bg']);
      }
    });
  }

  ngOnDestroy(){
    this.genericService.todosSubject.unsubscribe();
  }
}
