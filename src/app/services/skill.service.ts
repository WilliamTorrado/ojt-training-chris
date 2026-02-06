import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // make the data available even when you go to other page
})
export class SkillService {
  private skillsSource = new BehaviorSubject<string[]>(['Angular v8', 'Javascript', 'SQL']);

  // allow components to listen to changes
  skills$ = this.skillsSource.asObservable();
  
  constructor() { }

  // use map() operator
  getFormattedSkills(): Observable<string[]> {
    return this.skills$.pipe(
      delay(500),
      map(skills => skills.map(s => s.trim().toUpperCase())), 
      catchError(err => {
        console.error('Error in SkillService:', err);
        return throwError('Failed to load skills. Please try again.');
      })
    );
  }

  updateSkills(newSkills: string[]) {
    this.skillsSource.next(newSkills);
  }

}
