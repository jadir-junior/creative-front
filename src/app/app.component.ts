import { Component } from '@angular/core';
import { MenuItem } from './components/panel-menu/base-panel-menu-item';

@Component({
  selector: 'app-root',
  template: `
    <div style="display: flex">
      <ctv-sidebar>
        <ctv-panel-menu [model]="items"></ctv-panel-menu>
      </ctv-sidebar>
      <h1>Test do texto pra ver se ficou atras do menu</h1>
    </div>
  `,
})
export class AppComponent {
  items: MenuItem[] = [
    {
      label: 'Business',
      items: [
        {
          label: 'Business unit',
          routerLink: '/business/create-and-update-business-unit',
        },
        {
          label: 'Business unit local',
        },
        {
          label: 'Occupation Area',
        },
      ],
    },
  ];
}
