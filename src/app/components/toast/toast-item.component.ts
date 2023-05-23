import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgZone,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Message } from './message.interface';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export interface EventCloseToastItem {
  index: number;
  message?: Message;
}

@Component({
  selector: 'ctv-toast-item',
  template: `
    <div
      [attr.id]="message?.id"
      [ngClass]="classes"
      [@messageState]="{
        value: 'visible',
        params: {
          showTransformParams: showTransformOptions,
          hideTransformParams: hideTransformOptions,
          showTransitionParams: showTransitionOptions,
          hideTransitionParams: hideTransitionOptions
        }
      }"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
    >
      <div
        class="ctv-toast-message-content"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <ng-container>
          <ctv-icon *ngIf="message?.icon" [icon]="message?.icon"></ctv-icon>
          <span
            class="ctv-toast-message-icon ctv-toast-message-icon-outline-outer"
            *ngIf="!message?.icon"
          >
            <span class="ctv-toast-message-icon-outline-inner">
              <ng-container>
                <ctv-icon
                  *ngIf="message?.severity === 'success'"
                  icon="info"
                ></ctv-icon>
                <ctv-icon
                  *ngIf="message?.severity === 'error'"
                  icon="info"
                ></ctv-icon>
              </ng-container>
            </span>
          </span>

          <div class="ctv-toast-message-text">
            <div
              class="text-sm text-semi-bold ctv-toast-summary"
              *ngIf="message?.summary"
            >
              {{ message?.summary }}
            </div>
            <div
              class="text-sm text-regular ctv-toast-detail"
              *ngIf="message?.detail"
            >
              {{ message?.detail }}
            </div>
          </div>
          <button
            type="button"
            class="ctv-toast-icon-close ctv-link"
            (click)="onCloseIconClick($event)"
            (keydown.enter)="onCloseIconClick($event)"
            *ngIf="message?.closable !== false"
          >
            <ctv-icon icon="close"></ctv-icon>
          </button>
        </ng-container>
      </div>
    </div>
  `,
  animations: [
    trigger('messageState', [
      state('visible', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: '{{showTransformParams}}', opacity: 0 }),
        animate('{{showTransitionParams}}'),
      ]),
      transition('* => void', [
        animate(
          '{{hideTransitionParams}}',
          style({ height: 0, opacity: 0, transform: '{{hideTransformParams}}' })
        ),
      ]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastItemComponent implements AfterViewInit {
  timeout?: ReturnType<typeof setTimeout>;

  @Input() message?: Message;
  @Input() index: number = 0;

  @Input() showTransformOptions!: string;
  @Input() hideTransformOptions!: string;
  @Input() showTransitionOptions!: string;
  @Input() hideTransitionOptions!: string;

  @Output() onClose: EventEmitter<EventCloseToastItem> =
    new EventEmitter<EventCloseToastItem>();

  get classes() {
    return {
      [`ctv-toast-message-${this.message?.severity}`]: true,
      'ctv-toast-message': true,
    };
  }

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.initTimeout();
  }

  onMouseEnter(): void {
    this.clearTimeout();
  }

  onMouseLeave(): void {
    this.initTimeout();
  }

  initTimeout(): void {
    if (!this.message?.sticky) {
      this.zone.runOutsideAngular(() => {
        this.timeout = setTimeout(() => {
          this.onClose.emit({
            index: this.index,
            message: this.message,
          });
        }, this.message?.life || 3000);
      });
    }
  }

  onCloseIconClick(event: Event): void {
    this.clearTimeout();

    this.onClose.emit({
      index: this.index,
      message: this.message,
    });

    event.preventDefault();
  }

  clearTimeout(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }
}
