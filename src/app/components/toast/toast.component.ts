import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Message } from './message.interface';
import { ToastCloseEvent } from './toast.interface';
import { EventCloseToastItem } from './toast-item.component';
import {
  AnimationEvent,
  animateChild,
  query,
  transition,
  trigger,
} from '@angular/animations';
import { UniqueComponentId } from '../../utils/unique-component-id/unique-component-id';
import { ZIndexUtils } from '../../utils/z-index-utils/z-index-utils';
import { CreativeConfigService } from '../../utils/config/creative-config.service';
import { ObjectUtils } from '../../utils/object-utils/object-utils';
import { Subscription } from 'rxjs';
import { MessageService } from './message.service';

type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'center';

@Component({
  selector: 'ctv-toast',
  template: `
    <div [ngClass]="classes" #container>
      <ctv-toast-item
        *ngFor="let msg of messages; let i = index"
        [message]="msg"
        [index]="i"
        (onClose)="onMessageClose($event)"
        @toastAnimation
        (@toastAnimation.start)="onAnimationStart($event)"
        (@toastAnimation.done)="onAnimationEnd($event)"
        [showTransformOptions]="showTransformOptions"
        [hideTransformOptions]="hideTransformOptions"
        [showTransitionOptions]="showTransitionOptions"
        [hideTransitionOptions]="hideTransitionOptions"
      ></ctv-toast-item>
    </div>
  `,
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('toastAnimation', [
      transition(':enter, :leave', [query('@*', animateChild())]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToastComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  id = UniqueComponentId.generateId();

  messageSubscription?: Subscription;
  clearSubscription?: Subscription;
  messageArchieve?: Message[];

  @ViewChild('container') containerViewChild?: ElementRef<HTMLElement>;

  @Input() position: Position = 'top-right';
  @Input() autoZIndex = true;
  @Input() baseZIndex = 0;
  @Input() key?: string;
  @Input() preventDuplicates = false;

  @Input() showTransformOptions = 'translateY(100%)';
  @Input() hideTransformOptions = 'translateY(-100%)';
  @Input() showTransitionOptions = '300ms ease-out';
  @Input() hideTransitionOptions = '250ms ease-in';

  @Output() onClose: EventEmitter<ToastCloseEvent> =
    new EventEmitter<ToastCloseEvent>();

  get classes() {
    return {
      'ctv-toast ctv-component': true,
      [`ctv-toast-${this.position}`]: true,
    };
  }

  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
    private config: CreativeConfigService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.messageSubscription = this.messageService.message$.subscribe(
      (messages) => {
        if (messages) {
          if (Array.isArray(messages)) {
            const filteredMessage = messages.filter((m) => this.canAdd(m));
            this.add(filteredMessage);
          } else if (this.canAdd(messages)) {
            this.add([messages]);
          }
        }
      }
    );

    this.clearSubscription = this.messageService.clear$.subscribe((key) => {
      if (key) {
        if (this.key === key) {
          this.messages = [];
        } else {
          this.messages = [];
        }

        this.cd.markForCheck();
      }
    });
  }

  add(messages: Message[]): void {
    this.messages = this.messages
      ? [...this.messages, ...messages]
      : [...messages];

    if (this.preventDuplicates) {
      this.messageArchieve = this.messageArchieve
        ? [...this.messageArchieve, ...messages]
        : [...messages];
    }

    this.cd.markForCheck();
  }

  canAdd(message: Message): boolean {
    let allow = this.key === message?.key;

    if (allow && this.preventDuplicates) {
      allow = !this.containsMessage(this.messages, message);
    }

    if (allow && !this.preventDuplicates) {
      allow = !this.containsMessage(this.messageArchieve, message);
    }

    return allow;
  }

  containsMessage(collection?: Message[], message?: Message): boolean {
    if (!collection) {
      return false;
    }

    return (
      collection.find((m) => {
        return (
          m.summary === message?.summary &&
          m.detail == message?.detail &&
          m.severity === message?.severity
        );
      }) != null
    );
  }

  onMessageClose(event: EventCloseToastItem) {
    this.messages?.splice(event.index, 1);

    // this.onClose.emit({
    //   message: event.message,
    // });

    this.cd.detectChanges();
  }

  onAnimationStart(event: AnimationEvent): void {
    if (event.fromState === 'void') {
      this.renderer.setAttribute(
        this.containerViewChild?.nativeElement,
        this.id,
        ''
      );
      if (
        this.autoZIndex &&
        this.containerViewChild?.nativeElement.style.zIndex === ''
      ) {
        ZIndexUtils.set(
          'modal',
          this.containerViewChild.nativeElement,
          this.baseZIndex || this.config.zIndex.modal
        );
      }
    }
  }

  onAnimationEnd(event: AnimationEvent): void {
    if (event.fromState === 'void') {
      if (this.autoZIndex && ObjectUtils.isEmpty(this.messages)) {
        ZIndexUtils.clear(this.containerViewChild?.nativeElement);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    if (this.clearSubscription) {
      this.clearSubscription.unsubscribe();
    }

    if (this.containerViewChild && this.autoZIndex) {
      ZIndexUtils.clear(this.containerViewChild.nativeElement);
    }
  }
}
