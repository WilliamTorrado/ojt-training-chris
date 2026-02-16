import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

// Angular Material
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";

// Routing
import { AppRoutingModule } from "./app-routing.module";

// Components & Pipe
import { AppComponent } from "./app.component";
import { MypageComponent } from "./mypage/mypage.component";
import { HomeComponent } from "./pages/home/home.component";
import { ListComponent } from "./pages/list/list.component";
import { DetailComponent } from "./pages/detail/detail.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { HoursStatusPipe } from "./hours-status.pipe";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { StudentComponent } from "./student/student.component";
import { TaskComponent } from "./task/task.component";
import { SettingsComponent } from "./setting/setting.component";
import { AuthComponent } from "./auth/auth/auth.component";

@NgModule({
  declarations: [
    AppComponent,
    MypageComponent,
    HomeComponent,
    ListComponent,
    DetailComponent,
    NotFoundComponent,
    HoursStatusPipe,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    StudentComponent,
    TaskComponent,
    SettingsComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatProgressBarModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
