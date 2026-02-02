import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  user = {
    title: 'internship',
    name: 'jerald bon harris',
    status: 'online'
  };

  allowClick = false;
  showTasks = false;

  currentDate = new Date();

  taskList = [
    { id: 1, description: 'use interpolation', priority: 'high', deadline: new Date(2026, 1, 6) },
    { id: 2, description: 'use ngif and ngfor', priority: 'medium', deadline: new Date(2026, 1, 5) },
    { id: 3, description: 'use builtin pipes', priority: 'low', deadline: new Date(2026, 1, 4) }
  ];

  constructor() {
   setTimeout(() => {
     this.allowClick = true;
   }, 2000);
  }

  ngOnInit() {}

  getStatus() { 
    return this.user.status; 
  }

  onSave() {
    alert('data saved successfully');
  }

  toggleTasks() {
    this.showTasks = !this.showTasks;
  }

 
}


 