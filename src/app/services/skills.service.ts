import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const STORAGE_KEY = 'skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private skillsSubject = new BehaviorSubject<string[]>(this.loadFromStorage());
  skills$: Observable<string[]> = this.skillsSubject.asObservable();

  private loadFromStorage(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return parsed.map(s => (s || '').toString());
        }
      }
    } catch (e) {
      console.error('Failed to load skills from localStorage', e);
    }
    return [];
  }

  private saveToStorage(skills: string[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
    this.skillsSubject.next(skills);
  }

  getSkills(): string[] {
    return this.skillsSubject.value;
  }

  setSkills(skills: string[]): void {
    const cleaned = (skills || []).map(s => (s || '').toString().trim()).filter(Boolean);
    this.saveToStorage(cleaned);
  }
}

