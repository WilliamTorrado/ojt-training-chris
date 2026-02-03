import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() filterSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onFilterClick(category: string){
    this.filterSelected.emit(category);
  }

}
