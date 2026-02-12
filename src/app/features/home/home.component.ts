import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';
import { Task } from '../../shared/models/task.model';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  previewTasks: Task[] = [];
  completedCount = 0;
  totalCount = 0;
  skills: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private skillsService: SkillsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskService.tasks$.pipe(takeUntil(this.destroy$)).subscribe(tasks => {
      this.previewTasks = tasks.slice(0, 5);
      this.completedCount = tasks.filter(t => t.isCompleted).length;
      this.totalCount = tasks.length;
    });

    this.skillsService.skills$
      .pipe(takeUntil(this.destroy$))
      .subscribe(skills => {
        this.skills = skills || [];
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTaskSelected(task: Task): void {
    this.router.navigate(['/app/tasks', task.id]);
  }

  onMarkComplete(id: string): void {
    this.taskService.toggleComplete(id);
  }
}
