import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() menuClick = new EventEmitter<boolean>();

  // onToggle() {
  //   this.toggleSidebar.emit();
  // }
}
