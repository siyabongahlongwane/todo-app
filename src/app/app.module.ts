import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './modules/material.module';
import { ContainerComponent } from './container/container.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TaskviewComponent } from './taskview/taskview.component';
import { TaskComponent } from './task/task.component';
import { HomeComponent } from './home/home.component';
import { DynamicDialogComponent } from './dynamic-dialog/dynamic-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { UserDetailsDialogComponent } from './user-details-dialog/user-details-dialog.component';
import { CountsComponent } from './counts/counts.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    ToolbarComponent,
    TaskviewComponent,
    TaskComponent,
    HomeComponent,
    DynamicDialogComponent,
    ConfirmDialogComponent,
    UserDetailsDialogComponent,
    CountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
