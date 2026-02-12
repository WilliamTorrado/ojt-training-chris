import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../shared/models/task.model';

const STORAGE_KEY = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.loadFromStorage());
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  private loadFromStorage(): Task[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return parsed.map((t: any) => ({
          ...t,
          deadline: new Date(t.deadline)
        }));
      }
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
    }
    return [];
  }

  private saveToStorage(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }

  getTasks(): Task[] {
    return this.tasksSubject.value;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasksSubject.value.find(t => t.id === id);
  }

  addTask(task: Omit<Task, 'id' | 'isCompleted'>): Task {
    const newTask: Task = {
      ...task,
      id: this.generateId(),
      isCompleted: false
    };
    const tasks = [...this.tasksSubject.value, newTask];
    this.saveToStorage(tasks);
    return newTask;
  }

  updateTask(id: string, updates: Partial<Task>): void {
    const tasks = this.tasksSubject.value.map(t =>
      t.id === id ? { ...t, ...updates } : t
    );
    this.saveToStorage(tasks);
  }

  deleteTask(id: string): void {
    const tasks = this.tasksSubject.value.filter(t => t.id !== id);
    this.saveToStorage(tasks);
  }

  toggleComplete(id: string): void {
    const tasks = this.tasksSubject.value.map(t =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    this.saveToStorage(tasks);
  }

  private generateId(): string {
    return 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}
