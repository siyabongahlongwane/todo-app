import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../taskview/taskview.component';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  todosSubject = new BehaviorSubject<any>([]);
  todos$ = this.todosSubject.asObservable();
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
      data: data,
      panelClass: 'dynamic-dialog'
    }).afterClosed();
  }

  openSnackbar(message: string, panelClass: string[]){
    this.snackkbar.open(message, '', {
      duration: 3000,
      panelClass,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    })
  }

  fetchTodos() {
    const todos = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY) || '[]');
    this.updateTodos(todos);
  }

  deleteTodo(id: string, todos: Todo[]){
    todos.forEach((todo: any, index: number) => {
      if(todo.id === id){
        todos.splice(index, 1);
        this.openSnackbar('Todo deleted successfully', ['green-bg', 'white-color']);
      };
    });
    this.updateTodos(todos);
  }

  updateTodos(todos: Todo[]): any{
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(todos));
    this.todosSubject.next(todos);
  }
}
