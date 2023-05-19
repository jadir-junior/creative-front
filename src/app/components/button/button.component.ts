import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ctv-button',
  template: `
    <button
      class="ctv-button text-sm text-semi-bold"
      [ngClass]="classes"
      [disabled]="disabled"
      [type]="type"
      (click)="click()"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      .ctv-button {
        padding: 0.625rem 1rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;

        &:disabled {
          cursor: initial;
        }
      }

      .ctv-button-primary {
        color: var(--white);
        background: var(--primary-600);
        border: 1px solid var(--primary-600);

        &:hover {
          background: var(--primary-700);
          border: 1px solid var(--primary-700);
        }

        &:disabled {
          background: var(--primary-200);
          border: 1px solid var(--primary-200);
        }
      }

      .ctv-button-secondary {
        color: var(--gray-700);
        background: var(--white);
        border: 1px solid var(--gray-300);

        &:hover {
          background: var(--gray-100);
        }

        &:disabled {
          border: 1px solid var(--gray-200);
          background: var(--white);
          color: var(--gray-200);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';

  @Output() onClick = new EventEmitter();

  click(): void {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }

  get classes() {
    return {
      [`ctv-button-${this.color}`]: true,
    };
  }
}
