import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="display: flex">
      <ctv-sidebar></ctv-sidebar>
      <h1>Test do texto pra ver se ficou atras do menu</h1>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
