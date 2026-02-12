import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from '@angular/cdk/layout';

import { LayoutComponent } from './core/layout/layout.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

import { HomeComponent } from './features/home/home.component';
import { DashboardStatsComponent } from './features/home/dashboard-stats/dashboard-stats.component';

import { TasksListComponent } from './features/tasks/tasks-list/tasks-list.component';
import { TaskFormComponent } from './features/tasks/task-form/task-form.component';
import { TaskDetailComponent } from './features/tasks/task-detail/task-detail.component';
import { TaskCardComponent } from './features/tasks/task-card/task-card.component';
import { PriorityBadgeComponent } from './features/tasks/task-card/priority-badge/priority-badge.component';

import { DeploymentComponent } from './features/internship/deployment/deployment.component';
import { SkillsFormComponent } from './features/internship/skills-form/skills-form.component';
import { LoginComponent } from './features/auth/login/login.component';

import { PriorityLabelPipe } from './shared/pipes/priority-label.pipe';
import { TimeRemainingPipe } from './shared/pipes/time-remaining.pipe';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NotFoundComponent,
    HomeComponent,
    DashboardStatsComponent,
    TasksListComponent,
    TaskFormComponent,
    TaskDetailComponent,
    TaskCardComponent,
    PriorityBadgeComponent,
    DeploymentComponent,
    SkillsFormComponent,
    LoginComponent,
    PriorityLabelPipe,
    TimeRemainingPipe
  ],
  imports: [
    MatProgressBarModule, 
    MatProgressSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
