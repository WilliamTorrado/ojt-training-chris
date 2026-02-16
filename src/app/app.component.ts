import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  sidebarOpened = true;

  constructor(private router: Router, private authService: AuthService) {}

  toggleMenu() {
    this.sidebarOpened = !this.sidebarOpened;
  }

  isAuthRoute(): boolean {
    return this.router.url.startsWith("/auth");
  }

  handleMenuSelection(menu: string) {
    if (menu === "logout") {
      this.authService.logout();
      return;
    }

    this.router.navigate(["/" + menu]);
  }
}
