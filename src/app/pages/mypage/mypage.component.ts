import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {
  ojtUser = {
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    role: 'Frontend Intern',
    company: 'Web Developer',
    hoursRendered: 8,
    totalHoursRequired: 486,
    isClockedIn: true
  };
  constructor() { }

  ngOnInit() {
    console.log(this.ojtUser);
    console.log(this.ojtUser);
    console.log(this.ojtUser);
    console.log(this.ojtUser);
    console.log(this.ojtUser);
    
  }

  getRemainingHours(): number {
    return this.ojtUser.totalHoursRequired - this.ojtUser.hoursRendered;
  }

 
  toggleClock(): void {
    this.ojtUser.isClockedIn = !this.ojtUser.isClockedIn;
  }

}
