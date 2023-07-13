import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { TaskviewComponent } from './taskview/taskview.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'app/task-view'
  },
  {
    path: 'app', component: ContainerComponent, children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'task-view'
      },
      {
        path: 'task-view', component: TaskviewComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
