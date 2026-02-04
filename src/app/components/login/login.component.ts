import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    localStorage.setItem('isLoggedIn', 'true');
    
    this.router.navigate(['/home']);
  }

}
