import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarModule } from './components/sidebar/sidebar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SidebarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
