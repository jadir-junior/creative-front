import { Component } from '@angular/core';
import { MenuItem } from './components/panel-menu/base-panel-menu-item';

@Component({
  selector: 'app-root',
  template: `
    <div style="display: flex; height: 100%">
      <ctv-sidebar>
        <ctv-panel-menu [model]="items"></ctv-panel-menu>
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
export class AppComponent {
  items: MenuItem[] = [
    {
      label: 'Business',
      icon: 'factory',
      items: [
        {
          label: 'Business unit',
          routerLink: '/business/create-business-unit',
        },
        {
          label: 'Business unit local',
          routerLink: '/business/create-business-unit-local',
        },
        {
          label: 'Occupation Area',
          routerLink: '/business/create-occupation-area',
        },
      ],
    },
    {
      label: 'Home',
      icon: 'other_houses',
      items: [],
    },
    {
      label: 'Dashboard',
      icon: 'dashboard',
      items: [],
    },
  ];
}
