import { Component, Input } from '@angular/core';
import { Todo } from '../taskview/taskview.component';
import { GenericService } from '../services/generic.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent {
  @Input('task') task!: Todo;

  constructor(private genericService: GenericService){}

  deleteTask(id : string){
    this.genericService.deleteTodo(id);
  }

  editTask(task : Todo){
    this.genericService.openTaskDialog({text: {title: 'Edit Todo', buttonText: 'Update Todo'}, task}).subscribe((updatedTodo: Todo) => {
      if(updatedTodo) this.genericService.updateTodos('edit', updatedTodo);
    });
  }

  toggleCheckbox(checked: any){
    this.task.status = checked ? 'Completed' : 'Pending';
    this.genericService.updateTodos('edit', this.task);
  }
}
