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
  username!: string | null;
  dataLoaded: boolean = false;
  taskHeaders: any[] = [
    {
      label: 'Name',
      flex: 19,
      flexXtraSmall: '120px'
    },
    {
      label: 'Status',
      flex: 19,
      flexXtraSmall: '70px'
    },
    {
      label: 'Priority',
      flex: 19,
      flexXtraSmall: '80px'
    },
    {
      label: 'Due Date',
      flex: 19,
      flexXtraSmall: '70px'
    },
    {
      label: 'Action',
      flex: 19,
      flexXtraSmall: '70px'
    }
  ]
  constructor(private genericService: GenericService){}

  ngOnInit(): void {
    this.checkIfCapturedUsername();
    this.fetchAllTasks();
  }

  checkIfCapturedUsername(){
    const user = this.genericService.fetchFromLocalStorage('username');
    const username = user ? user : null;
    if(!username) {
      this.genericService.openUserNameDialog().subscribe((username: string) => {
        this.genericService.saveInLocalStorage('username', username);
        this.username = this.genericService.fetchFromLocalStorage('username');
      });
    } else {
        this.username = this.genericService.fetchFromLocalStorage('username');
    }
  }

  fetchAllTasks(){
    this.genericService.todos$.subscribe((todos: Todo[]) => {
      // Mimic API call by delaying mapping the data by 2 seconds
      this.dataLoaded = true;
      setTimeout(() => {
      this.dataLoaded = false;
        this.todos = todos;
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
