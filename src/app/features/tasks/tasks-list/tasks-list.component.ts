import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../shared/models/task.model';

type FilterType = 'all' | 'active' | 'completed' | 'high' | 'medium' | 'low';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter: FilterType = 'all';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    switch (this.filter) {
      case 'active':
        this.filteredTasks = this.tasks.filter(t => !t.isCompleted);
        break;
      case 'completed':
        this.filteredTasks = this.tasks.filter(t => t.isCompleted);
        break;
      case 'high':
      case 'medium':
      case 'low':
        this.filteredTasks = this.tasks.filter(t => t.priority === this.filter);
        break;
      default:
        this.filteredTasks = [...this.tasks];
    }
  }

  onFilterChange(filter: FilterType): void {
    this.filter = filter;
    this.applyFilter();
  }

  addTask(): void {
    this.router.navigate(['/app/tasks/add']);
  }

  editTask(task: Task): void {
    this.router.navigate(['/app/tasks', task.id]);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id);
  }

  markComplete(id: string): void {
    this.taskService.toggleComplete(id);
  }
}
