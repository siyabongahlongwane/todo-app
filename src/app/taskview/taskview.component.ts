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
  username: string = '';
  dataLoaded: boolean = false;
  taskHeaders: any[] = [
    {
      label: 'Task Name',
      flex: 30.5
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
    this.checkIfCapturedUsername();
    this.fetchAllTasks();
  }

  checkIfCapturedUsername(){
    const user = localStorage.getItem('username');
    const username = user ? user : null;
    if(!username) {
      this.genericService.openUserNameDialog().subscribe((username: string) => {
        localStorage.setItem('username', username);
      });
    } else {
      this.username = username;
    }
  }

  fetchAllTasks(){
    this.genericService.todos$.subscribe((todos: Todo[]) => {
      // Mimic API call by delaying fethcing the data by 2 seconds
      this.dataLoaded = true;
      setTimeout(() => {
      this.dataLoaded = false;
        this.todos = todos;
        this.uncompletedTasks = this.todos.filter((todo: Todo) => todo.status == 'Pending')?.length;
      }, 2000)
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
