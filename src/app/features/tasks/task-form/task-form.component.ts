import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
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
    private taskService: TaskService,
    private router: Router
  ) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    const deadline = this.model.deadline ? new Date(this.model.deadline) : new Date();
    this.taskService.addTask({
      name: this.model.name,
      details: this.model.details,
      deadline,
      priority: this.model.priority
    });
    this.router.navigate(['/app/tasks']);
  }

  cancel(): void {
    this.router.navigate(['/app/tasks']);
  }
}
