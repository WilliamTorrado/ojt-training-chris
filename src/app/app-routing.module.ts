import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


// different components
import { HomeComponent } from './components/home/home.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { ProfileStatsComponent } from './components/profile-stats/profile-stats.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TestComponent } from './pages/test/test.component';
import { AuthGuard } from './guards/auth.guard';
import { SkillsMgmtComponent } from './components/skills-mgmt/skills-mgmt.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  
  { 
    path: '', 
    component: TestComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'skills', component: SkillsMgmtComponent },
      { path: 'home', component: HomeComponent },
      { path: 'tasks', component: TaskListComponent },
      { path: 'tasks/:id', component: TaskDetailComponent },
      
      { 
        path: 'profile', 
        component: ProfileComponent, 
        children: [
          { path: 'info', component: ProfileInfoComponent },
          { path: 'stats', component: ProfileStatsComponent },
          { path: '', redirectTo: 'info', pathMatch: 'full' } 
        ]
      },
      
  
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [],
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
