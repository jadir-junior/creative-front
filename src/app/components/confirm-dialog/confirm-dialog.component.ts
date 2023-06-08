import { CreativeConfigService } from './../../utils/config/creative-config.service';
import {
  AnimationEvent,
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewEncapsulation,
  ViewRef,
} from '@angular/core';
import { DomHandler } from '../../utils/dom/dom-handler';
import { UniqueComponentId } from '../../utils/unique-component-id/unique-component-id';
import { DOCUMENT } from '@angular/common';
import { Target } from '../../types/target.type';
import { ZIndexUtils } from '../../utils/z-index-utils/z-index-utils';
import { ConfirmationService } from './confirmation.service';
import { Subscription } from 'rxjs';
import { CreativeTemplate } from '../../directives/creative-template/creative-template.directive';

const showAnimation = animation([
  style({ transform: '{{transform}}', opacity: 0 }),
  animate('{{transition}}', style({ transform: 'none', opacity: 1 })),
]);

const hideAnimation = animation([
  animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 })),
]);

type DefaultFocus = 'accept' | 'reject' | 'close';

type Position =
  | 'top-left'
  | 'bottom-left'
  | 'left'
  | 'top-right'
  | 'bottom-right'
  | 'right'
  | 'bottom'
  | 'top'
  | 'center';

export interface Confirmation {
  message?: string;
  key?: string;
  icon?: string;
  header?: string;
  accept?: Function;
  reject?: Function;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptIcon?: string;
  rejectIcon?: string;
  acceptVisible?: boolean;
  rejectVisible?: boolean;
  blockScroll?: boolean;
  closeOnEscape?: boolean;
  dismissableMask?: boolean;
  defaultFocus?: string;
  acceptButtonStyleClass?: string;
  rejectButtonStyleClass?: string;
  target?: EventTarget;
  acceptEvent?: EventEmitter<any>;
  rejectEvent?: EventEmitter<any>;
}

export enum ConfirmEventType {
  ACCEPT,
  REJECT,
  CANCEL,
}

@Component({
  selector: 'ctv-confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  animations: [
    trigger('animation', [
      transition('void => visible', [useAnimation(showAnimation)]),
      transition('visible => void', [useAnimation(hideAnimation)]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements AfterContentInit, OnDestroy {
  _visible = false;
  _position: Position = 'center';

  subscription?: Subscription;
  maskVisible = false;
  transformOptions = 'scale(0.7)';
  container: HTMLDivElement | null = null;
  wrapper: HTMLElement | null | undefined = null;
  contentContainer: HTMLElement | null = null;
  confirmationOptions: Confirmation | null = null;
  id = UniqueComponentId.generateId();
  confirmation: Confirmation | null = null;
  documentEscapeListener: null | (() => void) = null;

  footerTemplate: TemplateRef<CreativeTemplate> | null = null;

  @Input() rtl = false;
  @Input() transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() appendTo: Target = null;
  @Input() autoZIndex = true;
  @Input() baseZIndex = 0;
  @Input() closable = true;
  @Input() focusTrap = true;
  @Input() defaultFocus: DefaultFocus = 'accept';
  @Input() blockScroll = true;
  @Input() key?: string;
  @Input() message?: string;
  @Input() header?: string;
  @Input() style: { [klass: string]: string } | null = null;
  @Input() rejectLabel = 'No';
  @Input() acceptLabel = 'Yes';
  @Input() closeOnEscape = true;

  @Output() onHide: EventEmitter<ConfirmEventType> = new EventEmitter();

  @ContentChildren(CreativeTemplate) templates?: QueryList<CreativeTemplate>;

  @Input() get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;

    if (this._visible && !this.maskVisible) {
      this.maskVisible = true;
    }

    this.cd.markForCheck();
  }

  @Input() get position(): Position {
    return this._position;
  }

  set position(value: Position) {
    this._position = value;

    switch (value) {
      case 'top-left':
      case 'bottom-left':
      case 'left':
        this.transformOptions = 'translate3d(-100%, 0px, 0px)';
        break;
      case 'top-right':
      case 'bottom-right':
      case 'right':
        this.transformOptions = 'translate3d(100%, 0px, 0px)';
        break;
      case 'bottom':
        this.transformOptions = 'translate3d(0px, 100%, 0px)';
        break;
      case 'top':
        this.transformOptions = 'translate3d(0px, -100%, 0px)';
        break;
      default:
        this.transformOptions = 'scale(0.7)';
        break;
    }
  }

  get rejectButtonLabel(): string | undefined {
    return this.option('rejectLabel');
  }

  get acceptButtonLabel(): string | undefined {
    return this.option('acceptLabel');
  }

  constructor(
    private cd: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    public config: CreativeConfigService,
    private confirmationService: ConfirmationService,
    public el: ElementRef,
    public renderer: Renderer2
  ) {
    this.subscription = this.confirmationService.requireConfirmation$.subscribe(
      (confirmation) => {
        if (!confirmation) {
          this.hide();
          return;
        }

        if (confirmation.key === this.key) {
          this.confirmation = confirmation;
          this.confirmationOptions = {
            message: this.confirmation.message || this.message,
            header: this.confirmation.header || this.header,
            blockScroll:
              this.confirmation.blockScroll === false ||
              this.confirmation.blockScroll === true
                ? this.confirmation.blockScroll
                : this.blockScroll,
            rejectLabel: this.confirmation.rejectLabel || this.rejectLabel,
            acceptLabel: this.confirmation.acceptLabel || this.acceptLabel,
            defaultFocus: this.confirmation.defaultFocus || this.defaultFocus,
            closeOnEscape:
              this.confirmation.closeOnEscape === false ||
              this.confirmation.closeOnEscape === true
                ? this.confirmation.closeOnEscape
                : this.closeOnEscape,
          };

          if (this.confirmation.accept) {
            this.confirmation.acceptEvent = new EventEmitter();
            this.confirmation.acceptEvent.subscribe(this.confirmation.accept);
          }

          if (this.confirmation.reject) {
            this.confirmation.rejectEvent = new EventEmitter();
            this.confirmation.rejectEvent.subscribe(this.confirmation.reject);
          }

          this.visible = true;
        }
      }
    );
  }

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case 'footer':
          this.footerTemplate = item.template;
          break;
      }
    });
  }

  getMaskClass(): { [key: string]: boolean } {
    const maskClass: { [key: string]: boolean } = {
      'ctv-dialog-mask ctv-component-overlay': true,
      'ctv-dialog-mask-scrollblocker': this.blockScroll,
    };
    maskClass[this.getPositionClass().toString()] = true;
    return maskClass;
  }

  getPositionClass() {
    const positions: Position[] = [
      'left',
      'right',
      'top',
      'top-left',
      'top-right',
      'bottom',
      'bottom-left',
      'bottom-right',
    ];
    const pos = positions.find((item) => item === this.position);

    return pos ? `ctv-dialog-${pos}` : '';
  }

  hide(type?: ConfirmEventType): void {
    this.onHide.emit(type);
    this.visible = false;
    this.confirmation = null;
    this.confirmationOptions = null;
  }

  option(name: string): undefined | string {
    const source: { [key: string]: any } = this.confirmationOptions || this;
    if (source.hasOwnProperty(name)) {
      return source[name];
    }
    return undefined;
  }

  enableModality(): void {
    if (this.option('blockScroll')) {
      DomHandler.addClass(this.document.body, 'ctv-overflow-hidden');
    }
  }

  disableModality(): void {
    this.maskVisible = false;

    if (this.option('blockScroll')) {
      DomHandler.removeClass(this.document.body, 'ctv-overflow-hidden');
    }

    if (this.container && !(this.cd as ViewRef)['destroyed']) {
      this.cd.detectChanges();
    }
  }

  appendContainer(): void {
    if (this.appendTo) {
      if (this.appendTo === 'body') {
        this.document.body.appendChild(this.wrapper as HTMLElement);
      } else {
        DomHandler.appendChild(this.wrapper, this.appendTo);
      }
    }
  }

  moveOnTop(): void {
    if (this.autoZIndex && this.container && this.wrapper) {
      ZIndexUtils.set(
        'modal',
        this.container,
        this.baseZIndex + this.config.zIndex.modal
      );
      this.wrapper.style.zIndex = String(
        parseInt(this.container.style.zIndex, 10) - 1
      );
    } else {
      throw new Error(
        `Cannot config moveOnTop because "container" or "wrapper" is undefined`
      );
    }
  }

  close(event: Event): void {
    if (this.confirmation?.rejectEvent) {
      this.confirmation.rejectEvent.emit(ConfirmEventType.CANCEL);
    }

    this.hide(ConfirmEventType.CANCEL);
    event.preventDefault();
  }

  bindGlobalListeners(): void {
    if (
      (this.option('closeOnEscape') && this.closable) ||
      (this.focusTrap && !this.documentEscapeListener)
    ) {
      const documentTarget: Document | string = this.el
        ? this.el.nativeElement.ownerDocument
        : 'document';

      this.documentEscapeListener = this.renderer.listen(
        documentTarget,
        'keydown',
        (event: KeyboardEvent) => {
          if (
            event.which === 27 &&
            this.option('closeOnEscape') &&
            this.closable &&
            this.container
          ) {
            if (
              parseInt((this.container as HTMLDivElement).style.zIndex) ===
                ZIndexUtils.getZindex(this.container) &&
              this.visible
            ) {
              this.close(event);
            }
          }

          if (event.which === 9 && this.focusTrap) {
            event.preventDefault();

            let focusableElements: HTMLElement[] =
              DomHandler.getFocusableElements(this.container as HTMLDivElement);

            if (focusableElements.length) {
              if (!focusableElements[0].ownerDocument.activeElement) {
                focusableElements[0].focus();
              } else {
                let focusedIndex: number = focusableElements.indexOf(
                  focusableElements[0].ownerDocument
                    .activeElement as HTMLElement
                );

                if (event.shiftKey) {
                  if (focusedIndex === -1 || focusedIndex === 0) {
                    focusableElements[focusableElements.length - 1].focus();
                  } else {
                    focusableElements[focusedIndex - 1].focus();
                  }
                } else {
                  if (
                    focusedIndex === -1 ||
                    focusedIndex === focusableElements.length - 1
                  ) {
                    focusableElements[0].focus();
                  } else {
                    focusableElements[focusedIndex + 1].focus();
                  }
                }
              }
            }
          }
        }
      );
    }
  }

  unbindGlobalListerners(): void {
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
      this.documentEscapeListener = null;
    }
  }

  getElementToFocus(): HTMLElement | null {
    switch (this.option('defaultFocus')) {
      case 'accept':
        return DomHandler.findSingle(
          this.container,
          '.ctv-confirm-dialog-accept'
        );
      case 'reject':
        return DomHandler.findSingle(
          this.container,
          '.ctv-confirm-dialog-reject'
        );
      case 'close':
        return DomHandler.findSingle(
          this.container,
          '.ctv-dialog-header-close'
        );
      case 'none':
        return null;
      default:
        return DomHandler.findSingle(
          this.container,
          '.ctv-confirm-dialog-accept'
        );
    }
  }

  onAnimationStart(event: AnimationEvent): void {
    switch (event.toState) {
      case 'visible':
        this.container = event.element;
        this.wrapper = this.container?.parentElement;
        this.contentContainer = DomHandler.findSingle(
          this.container,
          '.ctv-dialog-content'
        );
        this.container?.setAttribute(this.id, '');
        this.appendContainer();
        this.moveOnTop();
        this.bindGlobalListeners();
        this.enableModality();

        const element = this.getElementToFocus();
        if (element) {
          element.focus();
        }
        break;
    }
  }

  onAnimationEnd(event: AnimationEvent): void {
    switch (event.toState) {
      case 'void':
        this.onOverlayHide();
        break;
    }
  }

  onOverlayHide(): void {
    if (this.container && this.autoZIndex) {
      ZIndexUtils.clear(this.container);
    }

    this.disableModality();
    this.unbindGlobalListerners();
    this.container = null;
  }

  reject(): void {
    if (this.confirmation && this.confirmation.rejectEvent) {
      this.confirmation.rejectEvent.emit(ConfirmEventType.REJECT);
    }

    this.hide(ConfirmEventType.REJECT);
  }

  accept(): void {
    if (this.confirmation && this.confirmation.acceptEvent) {
      this.confirmation.acceptEvent.emit(ConfirmEventType.ACCEPT);
    }

    this.hide(ConfirmEventType.ACCEPT);
  }

  ngOnDestroy(): void {
    this.onOverlayHide();

    this.subscription?.unsubscribe();
  }
}
