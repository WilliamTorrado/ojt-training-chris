import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  template: `
    <h2>Time Logs</h2>
    <router-outlet></router-outlet> <!-- child routes render here -->
  `
})
export class ListComponent {}