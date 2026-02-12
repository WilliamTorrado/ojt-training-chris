import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { HomeComponent } from './features/home/home.component';
import { TasksListComponent } from './features/tasks/tasks-list/tasks-list.component';
import { TaskFormComponent } from './features/tasks/task-form/task-form.component';
import { TaskDetailComponent } from './features/tasks/task-detail/task-detail.component';
import { DeploymentComponent } from './features/internship/deployment/deployment.component';
import { SkillsFormComponent } from './features/internship/skills-form/skills-form.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { LoginComponent } from './features/auth/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', component: HomeComponent },
      { path: 'tasks', component: TasksListComponent },
      { path: 'tasks/add', component: TaskFormComponent },
      { path: 'tasks/:id', component: TaskDetailComponent },
      { path: 'internship/deployment', component: DeploymentComponent },
      { path: 'internship/skills', component: SkillsFormComponent },
      { path: '**', component: NotFoundComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
