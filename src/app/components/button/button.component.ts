import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

type Color = 'primary' | 'secondary' | 'danger';

type Type = 'submit' | 'button';

type Variant = 'default' | 'text';

@Component({
  selector: 'ctv-button',
  template: `
    <button
      class="ctv-button text-sm text-semi-bold"
      [ngClass]="classes"
      [disabled]="disabled"
      [type]="type"
      [attr.aria-label]="ariaLabel"
      (click)="click($event)"
    >
      <ng-content></ng-content>
      <ng-container>
        <ctv-icon *ngIf="icon" [icon]="icon"></ctv-icon>
      </ng-container>
    </button>
  `,
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() color: Color = 'primary';
  @Input() type: Type = 'button';
  @Input() variant: Variant = 'default';
  @Input() label?: string;
  @Input() disabled = false;
  @Input() icon?: string;
  @Input() rounded = false;
  @Input() block = false;
  @Input() ariaLabel?: string;

  @Output() onClick: EventEmitter<Event> = new EventEmitter<Event>();

  click(event: Event): void {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }

  get classes() {
    return {
      [`ctv-button-${this.color}`]: true,
      [`ctv-button-variant-${this.variant}`]: true,
      'ctv-button-block': this.block,
      'ctv-button-rounded': this.rounded,
      'ctv-button-icon-only': this.icon && !this.label,
    };
  }
}
