import { Component, OnInit } from '@angular/core';
import { TimeLogService, TimeLog } from '../../services/time-log.service';
import { Observable } from 'rxjs';
import { SharedDataService } from '../../services/shared-data.service';
import { formatHoursMinutes } from '../../utils/time-format.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  internName$: Observable<string>;

  requiredHours = 486;

  renderedHours = 0;          // decimal total
  remainingHours = 486;       // decimal remaining

  selectedDate: string = '';
  timeIn: string = '';
  latestLog: TimeLog | null = null;

  constructor(private timeLogService: TimeLogService, private sharedDataService: SharedDataService) {
    this.internName$ = this.sharedDataService.internName$;
  }

  ngOnInit(): void {
    this.refreshComputation();
  }

  // =============================
  // MAIN COMPUTATION
  // =============================
  refreshComputation(): void {
    const logs = this.timeLogService.getLogs();

    const total = logs.reduce((sum, log) => sum + log.hours, 0);

    this.renderedHours = total;

    const remaining = this.requiredHours - total;
    this.remainingHours = remaining > 0 ? remaining : 0;

    if (logs.length > 0) {
      this.latestLog = logs[logs.length - 1];
    }
  }

  formatHours(decimalHours: number): string {
    return formatHoursMinutes(decimalHours);
  }

  // =============================
  // CLOCK IN
  // =============================
  clockIn(): void {
    const existing = this.timeLogService.getTimeIn();

    if (existing) {
      alert('You are already clocked in!');
      return;
    }

    const now = new Date();
    this.timeLogService.setTimeIn(now);
    this.timeIn = now.toLocaleTimeString();

    alert(`Clocked In at ${this.timeIn}`);
  }

  // =============================
  // CLOCK OUT
  // =============================
  clockOut(): void {
    const storedTimeIn = this.timeLogService.getTimeIn();

    if (!storedTimeIn) {
      alert('You must clock in first!');
      return;
    }

    const timeOut = new Date();

    let diffMs = timeOut.getTime() - storedTimeIn.getTime();

    // Handle overnight shift
    if (diffMs < 0) {
      diffMs += 24 * 60 * 60 * 1000;
    }

    const totalMinutes = Math.round(diffMs / (1000 * 60));
    const hoursDecimal = totalMinutes / 60;

    const record: TimeLog = {
      date: this.selectedDate || new Date().toISOString().split('T')[0],
      timeIn: storedTimeIn.toLocaleTimeString(),
      timeOut: timeOut.toLocaleTimeString(),
      hours: hoursDecimal
    };

    this.timeLogService.addLog(record);
    this.timeLogService.clearTimeIn();

    this.timeIn = '';
    this.refreshComputation();

    alert(`Clocked Out. Hours worked: ${this.formatHours(hoursDecimal)}`);
  }
}
