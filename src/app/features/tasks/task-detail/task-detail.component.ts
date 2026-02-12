import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../shared/models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null;
  isEditing = false;
  model = {
    name: '',
    details: '',
    deadline: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  };

  priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.task = this.taskService.getTaskById(id) || null;
      if (this.task) {
        this.model = {
          name: this.task.name,
          details: this.task.details,
          deadline: this.formatDateForInput(this.task.deadline),
          priority: this.task.priority
        };
      }
    }
  }

  private formatDateForInput(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  onSave(form: NgForm): void {
    if (form.invalid || !this.task) return;

    const deadline = this.model.deadline ? new Date(this.model.deadline) : new Date(this.task.deadline);
    this.taskService.updateTask(this.task.id, {
      name: this.model.name,
      details: this.model.details,
      deadline,
      priority: this.model.priority
    });
    this.task = this.taskService.getTaskById(this.task.id) || null;
    this.isEditing = false;
  }

  deleteTask(): void {
    if (this.task) {
      this.taskService.deleteTask(this.task.id);
      this.router.navigate(['/app/tasks']);
    }
  }

  markComplete(): void {
    if (this.task) {
      this.taskService.toggleComplete(this.task.id);
      this.task = this.taskService.getTaskById(this.task.id) || null;
    }
  }

  goBack(): void {
    this.router.navigate(['/app/tasks']);
  }
}
