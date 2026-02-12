import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Task } from '../shared/models/task.model';

interface UserProfile {
  username: string;
  password: string;
  fullName: string;
  role: 'intern' | 'mentor' | 'admin';
  skills: string[];
  tasks: Task[];
}

const TOKEN_KEY = 'auth_token';
const USERNAME_KEY = 'auth_username';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: UserProfile[] = [
    {
      username: 'jerald bon harris',
      password: 'qwerty123',
      fullName: 'Intern One',
      role: 'intern',
      skills: ['Angular', 'TypeScript', 'HTML', 'CSS'],
      tasks: [
        {
          id: 'seed_1',
          name: 'Complete onboarding',
          details: 'Finish reading the onboarding guide and set up the development environment.',
          deadline: new Date(new Date().setDate(new Date().getDate() + 3)),
          priority: 'high',
          isCompleted: false
        },
        {
          id: 'seed_2',
          name: 'Build sample component',
          details: 'Create a simple Angular component to display internship info.',
          deadline: new Date(new Date().setDate(new Date().getDate() + 5)),
          priority: 'medium',
          isCompleted: false
        }
      ]
    },
    {
      username: 'mentor',
      password: 'asdf123',
      fullName: 'Mentor User',
      role: 'mentor',
      skills: ['Code Review', 'Mentorship', 'Project Planning'],
      tasks: [
        {
          id: 'seed_3',
          name: 'Review intern tasks',
          details: 'Review the current list of intern tasks and provide feedback.',
          deadline: new Date(new Date().setDate(new Date().getDate() + 2)),
          priority: 'high',
          isCompleted: false
        }
      ]
    }
  ];

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      this.clearAuthStorage();
      this.isAuthenticatedSubject.next(false);
      return false;
    }

    const token = `fake-token-${user.username}-${Date.now()}`;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, user.username);
    this.isAuthenticatedSubject.next(true);
    return true;
  }

  logout(): void {
    this.clearAuthStorage();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  private clearAuthStorage(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  getCurrentUserProfile(): UserProfile | null {
    const username = localStorage.getItem(USERNAME_KEY);
    if (!username) {
      return null;
    }
    const user = this.users.find(u => u.username === username);
    return user ? user : null;
  }

  getStaticSkills(): string[] {
    const profile = this.getCurrentUserProfile();
    return profile ? profile.skills : [];
  }

  getStaticTasks(): Task[] {
    const profile = this.getCurrentUserProfile();
    return profile ? profile.tasks : [];
  }
}

