import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  idNumber: string = '';
  password: string = '';
  isRegistering: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  toggleMode() {
    this.isRegistering = !this.isRegistering;
    this.password = '';
    this.clearMessages();
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  submit() {
    this.clearMessages();

    if (!this.idNumber) {
      this.errorMessage = 'Please enter your ID Number.';
      return;
    }

    const normalizedId = this.normalizeIdNumber(this.idNumber);
    if (this.isRegistering) {
      if (!this.password) {
        this.errorMessage = 'Enter a password to register.';
        return;
      }

      if (this.authService.userExists(normalizedId)) {
        this.errorMessage = 'ID already registered. Please login instead.';
        return;
      }

      this.authService.register(normalizedId, this.password);
      this.successMessage = 'Registration successful! You can now login.';
      this.isRegistering = false;
      this.idNumber = normalizedId;
      this.password = '';
    } else {
      if (!this.password) {
        this.errorMessage = 'Enter your password.';
        return;
      }
      const success = this.authService.login(normalizedId, this.password);
      if (success) {
        this.idNumber = normalizedId;
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = 'Login failed. Wrong password.';
      }
    }
  }

  private normalizeIdNumber(value: string): string {
    const trimmed = (value || '').trim().toLowerCase();
    const noDomain = trimmed.endsWith('@usl.edu.ph') ? trimmed.replace('@usl.edu.ph', '') : trimmed;
    return noDomain.replace(/\s+/g, '');
  }
}
