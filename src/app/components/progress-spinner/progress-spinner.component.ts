import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ctv-progress-spinner',
  template: `
    <div class="ctv-progress-spinner" role="alert" aria-busy="true">
      <svg
        class="ctv-progress-spinner-svg"
        viewBox="25 25 50 50"
        [style.animation-duration]="animationDuration"
      >
        <circle
          class="ctv-progress-spinner-circle"
          cx="50"
          cy="50"
          r="20"
          [attr.fill]="fill"
          [attr.stroke-width]="strokeWidth"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
    <div class="ctv-progress-spinner-label" *ngIf="label">{{ label }}</div>
  `,
  styleUrls: ['./progress-spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProgressSpinnerComponent {
  @Input() strokeWidth = '4';
  @Input() fill = 'none';
  @Input() animationDuration = '2s';
  @Input() label?: string;
}
