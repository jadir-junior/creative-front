import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="display: flex; height: 100%">
      <ctv-sidebar>
        <ctv-aside-menu></ctv-aside-menu>
      </ctv-sidebar>
      <main>
        <router-outlet></router-outlet>
        <ctv-toast></ctv-toast>
      </main>
    </div>
  `,
  styles: [
    `
      main {
        margin: 2rem;
        margin-left: 18rem;
        width: 100%;
      }
    `,
  ],
})
export class AppComponent {}
