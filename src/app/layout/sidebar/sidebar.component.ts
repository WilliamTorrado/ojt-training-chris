import { Component, Input,  Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { SharedDataService, StudentProfile } from "../../services/shared-data.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  @Input() opened = false;
  @Output() menuSelected = new EventEmitter<string>();
  profile$: Observable<StudentProfile>;

  constructor(private sharedDataService: SharedDataService) {
    this.profile$ = this.sharedDataService.studentProfile$;
  }

  onMenuClick(menu: string) {
    this.menuSelected.emit(menu);
  }

  onLogout() {
    this.menuSelected.emit('logout');
  }
}
