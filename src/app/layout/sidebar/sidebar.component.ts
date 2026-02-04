import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit() {}

  onFilterClick(category: string){
    this.filterSelected.emit(category);
    this.navigated.emit();
  }

  // navigation to different pages
  onLinkClick() {
    this.navigated.emit();
  }

}
