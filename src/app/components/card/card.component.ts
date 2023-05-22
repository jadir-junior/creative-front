import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ctv-card',
  template: ` <div [ngClass]="cardClasses"><ng-content></ng-content></div> `,
  styleUrls: ['./card.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  get cardClasses() {
    return {
      'ctv-component ctv-card': true,
    };
  }
}
