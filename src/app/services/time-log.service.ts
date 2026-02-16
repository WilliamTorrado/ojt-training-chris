
import { Injectable } from '@angular/core';


export interface TimeLog {
  date: string;
  timeIn: string;
  timeOut: string;
  hours: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimeLogService {

  private logsBaseKey = 'timeLogs';
  private timeInBaseKey = 'currentTimeIn';

  // ===== TIME IN STORAGE =====
  setTimeIn(date: Date): void {
    localStorage.setItem(this.getScopedKey(this.timeInBaseKey), date.toISOString());
  }

  getTimeIn(): Date | null {
    const stored = localStorage.getItem(this.getScopedKey(this.timeInBaseKey));
    return stored ? new Date(stored) : null;
  }

  clearTimeIn(): void {
    localStorage.removeItem(this.getScopedKey(this.timeInBaseKey));
  }

  // ===== LOG STORAGE =====
  getLogs(): TimeLog[] {
    const data = localStorage.getItem(this.getScopedKey(this.logsBaseKey));
    return data ? JSON.parse(data) : [];
  }

  addLog(log: TimeLog): void {
    const logs = this.getLogs();
    logs.push(log);
    localStorage.setItem(this.getScopedKey(this.logsBaseKey), JSON.stringify(logs));
  }

  clearLogs(): void {
    localStorage.removeItem(this.getScopedKey(this.logsBaseKey));
  }

  private getScopedKey(baseKey: string): string {
    const userId = localStorage.getItem('token');
    return userId ? baseKey + ':' + userId : baseKey;
  }
}
