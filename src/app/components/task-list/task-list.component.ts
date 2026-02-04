import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  activeFilter = 'all';

  taskList = [
    { id: 1, description: 'setup angular router', priority: 'high', deadline: new Date(2026, 1, 10), isDone: true },
    { id: 2, description: 'create home, list, detail', priority: 'medium', deadline: new Date(2026, 1, 15), isDone: false },
    { id: 3, description: 'implement route parameters', priority: 'low', deadline: new Date(2026, 2, 1), isDone: false }
  ];

  constructor() { }

  ngOnInit(): void { }

  get filteredTasks() {
    if (this.activeFilter === 'all') return this.taskList;
    return this.taskList.filter(t => t.priority === this.activeFilter);
  }

  addTask(input: HTMLInputElement) {
    if (input.value.trim()) {
      const newTask = {
        id: Date.now(),
        description: input.value,
        priority: 'low',
        deadline: new Date(),
        isDone: false
      };
      this.taskList.push(newTask);
      input.value = '';
    }
  }

  toggleComplete(task: any) {
    task.isDone = !task.isDone;
  }

  deleteTask(id: number) {
    this.taskList = this.taskList.filter(t => t.id !== id);
  }

}
