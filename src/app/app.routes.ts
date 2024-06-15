import { Routes } from '@angular/router';
import { TaskCreateComponent } from './Task/task-create/task-create.component';
import { TaskShowComponent } from './Task/task-show/task-show.component';

export const routes: Routes = [
  { path: 'task-create', component: TaskCreateComponent },
  { path: 'task-show', component: TaskShowComponent },
  { path: '', redirectTo: 'task-create', pathMatch: 'full' },
  { path: '**', redirectTo: 'task-create' }
];
