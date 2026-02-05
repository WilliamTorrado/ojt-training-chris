import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @ViewChild('myInput', { static: false }) sidenav!: MatSidenav;
  
  // use of interpolation
  user = {
    title: 'internship',
    name: 'Jerald Bon Harris',
  };

  // use of property binding
  allowClick = false;
  showTasks = true;
  currentDate = new Date();
  
  activeFilter = 'all';

  // data array
  taskList = [
    { id: 1, description: 'use interpolation', priority: 'high', deadline: new Date(2026, 1, 6), isDone: true },
    { id: 2, description: 'use ngif and ngfor', priority: 'medium', deadline: new Date(2026, 1, 5), isDone: false },
    { id: 3, description: 'use builtin pipes', priority: 'low', deadline: new Date(2026, 1, 4), isDone: false }

  ];

  constructor() {
    setTimeout(() => {
      this.allowClick = true;
    }, 5000);
  }

  ngOnInit() {}

  // parent-child communication
  onFilterSelected(filter: string){
    this.activeFilter = filter;
    this.closeSidebar();
  }

  get filteredTasks() {
    if(this.activeFilter === 'all') return this.taskList;
    return this.taskList.filter(t => t.priority === this.activeFilter);
  }

  // event binding 
  addTask(input: HTMLInputElement) {
  if (input.value) {
    // Create a new array reference using the spread operator [...]
    this.taskList = [...this.taskList, {
      id: Date.now(), // Better ID generation
      description: input.value,
      priority: 'low',
      deadline: new Date(),
      isDone: false
    }];
    input.value = '';
  }
}

  deleteTask(id: number) {
  // .filter() already creates a new array reference, so this works perfectly
  this.taskList = this.taskList.filter(task => task.id !== id);
}

  toggleTasks() {
    this.showTasks = !this.showTasks;
    this.closeSidebar();
  }
  
  private closeSidebar() {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

 toggleComplete(task: any) {
  task.isDone = !task.isDone;
  // Trigger a reference change so the counter updates
  this.taskList = [...this.taskList];
}

getPendingCount() {
  return this.taskList.filter(t => !t.isDone).length;
}
}