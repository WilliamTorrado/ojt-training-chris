import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../shared/models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() taskClick = new EventEmitter<Task>();
  @Output() markComplete = new EventEmitter<string>();

  onTaskClick(): void {
    this.taskClick.emit(this.task);
  }

  onMarkComplete(event: Event): void {
    event.stopPropagation();
    this.markComplete.emit(this.task.id);
  }
}
