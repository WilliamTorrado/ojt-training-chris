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
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  clearMessages() {
    this.errorMessage = '';
  }

  submit() {
    this.clearMessages();

    if (!this.idNumber) {
      this.errorMessage = 'Please enter your ID Number.';
      return;
    }

    const normalizedId = this.normalizeIdNumber(this.idNumber);

    if (!this.password) {
      this.errorMessage = 'Enter your password.';
      return;
    }

    const success = this.authService.login(normalizedId, this.password);
    if (success) {
      this.idNumber = normalizedId;
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Login failed. Wrong ID number or password.';
    }
  }

  private normalizeIdNumber(value: string): string {
    const trimmed = (value || '').trim().toLowerCase();
    const noDomain = trimmed.endsWith('@usl.edu.ph') ? trimmed.replace('@usl.edu.ph', '') : trimmed;
    return noDomain.replace(/\s+/g, '');
  }
}
