import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  // use interpolation
  user = {
    title: 'internship',
    name: 'Jerald Bon Harris',
  };

  // use property binding 
  allowClick = false;
  showTasks = false;
  currentDate = new Date();

  // use ngFor
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

  // use event binding
  addTask(inputElement: HTMLInputElement){
    const description = inputElement.value;
    if(description){
      this.taskList.push({
        id: this.taskList.length + 1,
        description: description,
        priority: 'low',
        deadline: new Date(),
        isDone: false
      });
      inputElement.value = '';
    }
  }

  toggleTasks() {
    this.showTasks = !this.showTasks;
  }

  toggleComplete(task: any){
    task.isDone = !task.isDone;
  }
  

}


 