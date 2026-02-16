import { Component } from '@angular/core';
@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent {

  internName = 'Juan Dela Cruz';
  requiredHours = 486;

  timeLogs = [
    { date: new Date('2026-02-01'), hours: 8, task: 'Documentation' },
    { date: new Date('2026-02-02'), hours: 6, task: 'Testing' },
    { date: new Date('2026-02-03'), hours: 7, task: 'Bug Fixing' }
  ];

  displayedColumns: string[] = ['date', 'hours', 'task'];

  get totalHours(): number {
    return this.timeLogs.reduce((sum, log) => sum + log.hours, 0);
  }

  get remainingHours(): number {
    return this.requiredHours - this.totalHours;
  }

  get progress(): number {
    return (this.totalHours / this.requiredHours) * 100;
  }

  addLog() {
    this.timeLogs.push({
      date: new Date(),
      hours: 8,
      task: 'New Task'
    });
  }
}