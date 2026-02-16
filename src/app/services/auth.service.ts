import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private sharedDataService: SharedDataService) {}

  // Register: save password in localStorage
  register(idNumber: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const normalizedId = this.normalizeIdNumber(idNumber);
    users[normalizedId] = { password };
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Login: check password
  login(idNumber: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    const normalizedId = this.normalizeIdNumber(idNumber);
    const matchedKey = Object.keys(users).find((key) => this.normalizeIdNumber(key) === normalizedId);

    if (matchedKey && users[matchedKey] && users[matchedKey].password === password) {
      localStorage.setItem('token', normalizedId);
      this.migrateLegacyDataToUser(normalizedId);
      this.sharedDataService.refreshForCurrentUser();
      return true;
    }

    return false;
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    this.sharedDataService.refreshForCurrentUser();
    this.router.navigate(['/auth']);
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  userExists(idNumber: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const normalizedId = this.normalizeIdNumber(idNumber);
    return Object.keys(users).some((key) => this.normalizeIdNumber(key) === normalizedId);
  }

  private normalizeIdNumber(value: string): string {
    const trimmed = (value || '').trim().toLowerCase();
    const noDomain = trimmed.endsWith('@usl.edu.ph') ? trimmed.replace('@usl.edu.ph', '') : trimmed;
    return noDomain.replace(/\s+/g, '');
  }

  private migrateLegacyDataToUser(userId: string): void {
    const migrationPairs = [
      { legacyKey: 'tasks', scopedBase: 'tasks' },
      { legacyKey: 'timeLogs', scopedBase: 'timeLogs' },
      { legacyKey: 'currentTimeIn', scopedBase: 'currentTimeIn' },
      { legacyKey: 'studentProfile', scopedBase: 'studentProfile' },
      { legacyKey: 'internName', scopedBase: 'internName' }
    ];

    migrationPairs.forEach((pair) => {
      const legacyValue = localStorage.getItem(pair.legacyKey);
      if (legacyValue === null) {
        return;
      }

      const scopedKey = this.getScopedKey(pair.scopedBase, userId);
      if (localStorage.getItem(scopedKey) === null) {
        localStorage.setItem(scopedKey, legacyValue);
      }

      localStorage.removeItem(pair.legacyKey);
    });
  }

  private getScopedKey(baseKey: string, userId: string): string {
    return baseKey + ':' + userId;
  }
}
