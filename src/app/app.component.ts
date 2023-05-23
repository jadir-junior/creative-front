import { Component } from '@angular/core';
import { MenuItem } from './components/panel-menu/base-panel-menu-item';
import { MessageService } from './components/toast/message.service';

@Component({
  selector: 'app-root',
  template: `
    <div style="display: flex">
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
