import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string = 'Jerald Bon Harris';

  stats = {
    total: 12,
    completed: 8,
    pending: 4,
    productivity: '66%'
  };
  
  currentGreeting: string = '';

  ngOnInit(): void {
    this.setGreeting();
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) this.currentGreeting = 'Good Morning';
    else if (hour < 18) this.currentGreeting = 'Good Afternoon';
    else this.currentGreeting = 'Good Evening';
  }

}
