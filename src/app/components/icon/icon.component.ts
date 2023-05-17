import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ctv-icon',
  template: `
    <span class="material-symbols-outlined ctv-icon"> {{ icon }} </span>
  `,
  styles: [
    `
      .ctv-icon {
        display: flex;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class IconComponent {
  @Input() icon!: string;
}
