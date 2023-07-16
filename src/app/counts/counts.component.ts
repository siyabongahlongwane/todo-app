import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Todo } from '../taskview/taskview.component';

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styleUrls: ['./counts.component.scss']
})
export class CountsComponent implements OnChanges {
  @Input() tasks: Todo[] = [];
  counts: any = {
    total: 0,
    pending: 0,
    completed: 0
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateCounts(changes['tasks'].currentValue);
  }

  updateCounts(tasks: Todo[]){
    this.counts = {
      total: tasks?.length,
      pending: tasks?.filter((task: Todo) => task.status == 'Pending').length,
      completed: tasks?.filter((task: Todo) => task.status == 'Completed').length
    }
  }
}
