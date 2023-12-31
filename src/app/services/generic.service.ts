import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../taskview/taskview.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserDetailsDialogComponent } from '../user-details-dialog/user-details-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  todosSubject = new BehaviorSubject<any>([]);
  todos$ = this.todosSubject.asObservable();
  todosArr: Todo[] = [];
  LOCAL_STORAGE_KEY: string = 'todos';

  constructor(private dialog: MatDialog, private snackkbar: MatSnackBar) {
    this.fetchTodos();
   }

  openTaskDialog(data: any){
    return this.dialog.open(DynamicDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
      width: '500px',
      height: '425px',
      data: data
    }).afterClosed();
  }

  openConfirmDialog(data: any){
    return this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
      width: '300px',
      height: '165px',
      data: data
    }).afterClosed();
  }

  openUserNameDialog(){
    return this.dialog.open(UserDetailsDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
      width: '300px',
      height: '260px'
    }).afterClosed();
  }

  openSnackbar(message: string, panelClass: string[]){
    this.snackkbar.open(message, '', {
      duration: 3000,
      panelClass: [...panelClass],
      verticalPosition: 'top',
      horizontalPosition: 'end'
    })
  }

  // Fetch Tasks
  fetchTodos() {
    this.todosArr = this.fetchFromLocalStorage(this.LOCAL_STORAGE_KEY) || [];
    this.updateTodos('', this.todosArr);
  }

  // Delete Task
  deleteTodo(id: string){
    this.todosArr.forEach((todo: any, index: number) => {
      if(todo.id === id){
        this.todosArr.splice(index, 1);
        this.openSnackbar('Task deleted successfully', ['green-bg', 'white-color']);
      };
    });
    this.updateTodos('', this.todosArr);
  }

  // Update Tasks
  updateTodos(action: string = '', tasks: any): any{
    switch (action) {
      case 'add':
        this.todosArr = [...this.todosArr, tasks];
        break;

      case 'edit':
        this.todosArr.forEach((todo: Todo, index: number) => {
          if(todo.id == tasks.id) this.todosArr[index] = tasks; 
          this.openSnackbar('Task updated successfully', ['green-bg', 'white-color']);
        })
        break;
      default:
        break;
    }
    this.saveInLocalStorage(this.LOCAL_STORAGE_KEY, this.todosArr);
    this.todosSubject.next(this.sortTodos(this.todosArr));
  }

    // Sort Tasks - uncompleted tasks followed by completed tasks
    sortTodos(todos: Todo[]): Todo[]{
    const pendingTasks: Todo[] = todos.filter((tasks: Todo) => tasks.status == "Pending");
    const competedTasks: Todo[] = todos.filter((tasks: Todo) => tasks.status == "Completed");
    return [...pendingTasks, ...competedTasks];
    }

    // Store in local storage
    saveInLocalStorage(key: string, valueToStore: any){
      localStorage.setItem(key, JSON.stringify(valueToStore));
    }

    // Get from local storage
    fetchFromLocalStorage(key: string){
      return JSON.parse(localStorage.getItem(key)!);
    }
}
