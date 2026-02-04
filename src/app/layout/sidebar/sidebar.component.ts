import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  // filtering task list 
  @Output() filterSelected = new EventEmitter<string>();
  // close after navigation
  @Output() navigated = new EventEmitter<void>();

  constructor(private router: Router) { }

  ngOnInit() {}

  onFilterClick(category: string){
    this.filterSelected.emit(category);
    this.navigated.emit();
  }

  // navigation to different pages
  onLinkClick() {
    this.navigated.emit();
  }

  onLogout() {
    localStorage.removeItem('isLoggedIn');
    this.navigated.emit();
    
    this.router.navigate(['/login']);
  }


}
