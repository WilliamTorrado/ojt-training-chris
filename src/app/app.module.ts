import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponent } from './pages/test/test.component';
import { PriorityPipe } from './priority.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    PriorityPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
