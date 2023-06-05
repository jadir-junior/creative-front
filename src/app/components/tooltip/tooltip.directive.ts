import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { DomHandler } from '../../utils/dom/dom-handler';
import { ZIndexUtils } from '../../utils/z-index-utils/z-index-utils';
import { CreativeConfigService } from '../../utils/config/creative-config.service';
import { ConnectedOverlayScrollHandler } from '../../utils/connected-overlay-scroll-handler/connected-overlay-scroll-handler';

type TooltipPosition = 'right' | 'left' | 'bottom' | 'top' | undefined;

type TooltipEvent = 'hover' | 'focus' | undefined;

type TooltipAppendTo =
  | 'body'
  | 'target'
  | HTMLElement
  | ElementRef
  | TemplateRef<any>
  | string
  | null
  | undefined
  | any;

type TooltipZIndex = 'auto' | string | undefined;

export interface TooltipOptions {
  tooltipPosition?: TooltipPosition;
  tooltipEvent?: TooltipEvent;
  appendTo?: TooltipAppendTo;
  tooltipZIndex?: TooltipZIndex;
  escape: boolean;
  positionTop?: number;
  positionLeft?: number;
  autoHide: boolean;
  hideOnEscape: boolean;
  tooltipLabel?: string;
  tooltipStyleClass?: string;
  positionStyle?: string;
  hideDelay?: number;
  showDelay?: number;
  disabled?: boolean;
}

@Directive({
  selector: '[ctvTooltip]',
})
export class TooltipDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input() tooltipPostion: TooltipPosition = 'top';
  @Input() tooltipEvent: TooltipEvent = 'hover';
  @Input() appendTo: TooltipAppendTo = null;
  @Input() tooltipZIndex?: TooltipZIndex;
  @Input() escape = true;
  @Input() positionTop?: number;
  @Input() positionLeft?: number;
  @Input() autoHide = true;
  @Input() hideOnEscape = true;
  @Input() tooltipStyleClass?: string;
  @Input() fitContent = true;
  @Input() hideDelay?: number;
  @Input() showDelay?: number;
  @Input('ctvTooltip') text?: string;

  @Input() tooltipOptions?: TooltipOptions;

  active = false;
  container: HTMLElement | null = null;
  showTimeout: NodeJS.Timeout | null = null;
  hideTimeout: null | NodeJS.Timeout = null;
  tooltipText: HTMLDivElement | null = null;
  resizeListener: (() => void) | null = null;
  scrollHandler: ConnectedOverlayScrollHandler | null = null;
  mouseEnterListener: ((event: MouseEvent) => void) | null = null;
  mouseLeaveListener: ((event: MouseEvent) => void) | null = null;
  clickListener: (() => void) | null = null;
  focusListener: (() => void) | null = null;
  blurListener: (() => void) | null = null;

  containerMouseLeaveListener: (() => void) | null = null;

  _tooltipOptions: TooltipOptions = {
    tooltipPosition: 'top',
    tooltipEvent: 'hover',
    appendTo: 'body',
    tooltipZIndex: 'auto',
    escape: true,
    positionTop: 0,
    positionLeft: 0,
    autoHide: true,
    hideOnEscape: true,
  };

  _disabled = false;

  @Input('tooltipDisabled') get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
    this.deactivate();
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public zone: NgZone,
    public el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    public config: CreativeConfigService
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        if (this.getOption('tooltipEvent') === 'hover') {
          this.mouseEnterListener = this.onMouseEnter.bind(this);
          this.mouseLeaveListener = this.onMouseLeave.bind(this);
          this.clickListener = this.onInputClick.bind(this);
          this.el.nativeElement.addEventListener(
            'mouseenter',
            this.mouseEnterListener
          );
          this.el.nativeElement.addEventListener('click', this.clickListener);
          this.el.nativeElement.addEventListener(
            'mouseleave',
            this.mouseLeaveListener
          );
        } else if (this.getOption('tooltipEvent') === 'focus') {
          this.focusListener = this.onFocus.bind(this);
          this.blurListener = this.onBlur.bind(this);

          const target = this.getTarget(this.el.nativeElement);
          if (target) {
            target.addEventListener('focus', this.focusListener);
            target.addEventListener('blur', this.blurListener);
          }
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.setOption({ disabled: changes['disabled'].currentValue });
    }

    if (changes['showDelay']) {
      this.setOption({ showDelay: changes['showDelay'].currentValue });
    }

    if (changes['hideDelay']) {
      this.setOption({ hideDelay: changes['hideDelay'].currentValue });
    }

    if (changes['tooltipStyleClass']) {
      this.setOption({
        tooltipStyleClass: changes['tooltipStyleClass'].currentValue,
      });
    }

    if (changes['text']) {
      this.setOption({ tooltipLabel: changes['text'].currentValue });

      if (this.active) {
        if (changes['text'].currentValue) {
          if (this.container && this.container.offsetParent) {
            this.updateText();
            this.align();
          } else {
            this.show();
          }
        } else {
          this.hide();
        }
      }
    }

    if (changes['tooltipOptions']) {
      this._tooltipOptions = {
        ...this._tooltipOptions,
        ...changes['tooltipOptions'].currentValue,
      };
      this.deactivate();

      if (this.active) {
        if (this.getOption('tooltipLabel')) {
          if (this.container?.offsetParent) {
            this.updateText();
            this.align();
          } else {
            this.show();
          }
        } else {
          this.hide();
        }
      }
    }
  }

  getOption(options: string): any {
    return this._tooltipOptions[options as keyof typeof this.tooltipOptions];
  }

  setOption(option: Partial<TooltipOptions>): void {
    this._tooltipOptions = { ...this._tooltipOptions, ...option };
  }

  getTarget(element: HTMLElement): HTMLElement | null {
    return DomHandler.hasClass(element, 'ctv-inputwrapper')
      ? DomHandler.findSingle(element, 'input')
      : element;
  }

  onMouseEnter(e: MouseEvent): void {
    if (!this.container && !this.showTimeout) {
      this.activate();
    }
  }

  onMouseLeave(event: MouseEvent): void {
    if (!this.isAutoHide()) {
      const valid =
        DomHandler.hasClass(event.target as HTMLElement, 'ctv-tooltip') ||
        DomHandler.hasClass(event.target as HTMLElement, 'ctv-tooltip-text') ||
        DomHandler.hasClass(event.relatedTarget as HTMLElement, 'ctv-tooltip');
      !valid && this.deactivate();
    } else {
      this.deactivate();
    }
  }

  onInputClick(): void {
    this.deactivate();
  }

  onFocus(): void {
    this.deactivate();
  }

  onBlur(): void {
    this.deactivate();
  }

  activate(): void {
    this.active = true;
    this.clearHideTimeout();

    if (this.getOption('showDelay')) {
      this.showTimeout = setTimeout(() => {
        this.show();
      }, this.getOption('showDelay'));
    } else {
      this.show();
    }
  }

  show(): void {
    if (!this.getOption('tooltipLabel') || this.getOption('disabled')) {
      return;
    }

    this.create();

    if (this.container) {
      this.align();
      DomHandler.fadeIn(this.container, 250);

      if (this.getOption('tooltipZIndex') === 'auto') {
        ZIndexUtils.set('tooltip', this.container, this.config.zIndex.tooltip);
      } else {
        this.container.style.zIndex = this.getOption('tooltipZIndex');
      }

      this.bindDocumentResizeListener();
      this.bindScrollListener();
    } else {
      throw new Error(`to show the tooltip you need have a container`);
    }
  }

  hide(): void {
    if (this.container) {
      if (this.getOption('tooltipZIndex') === 'auto') {
        ZIndexUtils.clear(this.container);
      }

      this.remove();
    } else {
      throw new Error('The container is null in hide()');
    }
  }

  deactivate(): void {
    this.active = false;
    this.clearShowTimeout();

    if (this.getOption('hideDelay')) {
      this.clearHideTimeout();
      this.hideTimeout = setTimeout(() => {
        this.hide();
      }, this.getOption('hideDelay'));
    } else {
      this.hide();
    }
  }

  create(): void {
    if (this.container) {
      this.clearHideTimeout();
      this.remove();
    }

    this.container = document.createElement('div');

    const tooltipArrow = document.createElement('div');
    tooltipArrow.className = 'ctv-tooltip-arrow';
    this.container.appendChild(tooltipArrow);

    this.tooltipText = document.createElement('div');
    this.tooltipText.className = 'ctv-tooltip-text';

    this.updateText();

    if (this.getOption('positionStyle')) {
      this.container.style.position = this.getOption('positionStyle');
    }

    this.container.appendChild(this.tooltipText);

    if (this.getOption('appendTo') === 'body') {
      document.body.appendChild(this.container);
    } else if (this.getOption('appentTo') === 'target') {
      DomHandler.appendChild(this.container, this.el.nativeElement);
    } else {
      DomHandler.appendChild(this.container, this.getOption('appendTo'));
    }

    this.container.style.display = 'inline-block';

    if (this.fitContent) {
      this.container.style.width = 'fit-content';
    }

    if (!this.isAutoHide()) {
      this.bindContainerMouseLeaveListener();
    }
  }

  onWindowResize(): void {
    this.hide();
  }

  bindDocumentResizeListener(): void {
    this.zone.runOutsideAngular(() => {
      this.resizeListener = this.onWindowResize.bind(this);
      window.addEventListener('resize', this.resizeListener);
    });
  }

  bindContainerMouseLeaveListener(): void {
    if (!this.containerMouseLeaveListener) {
      const targetEl = this.container;

      this.containerMouseLeaveListener = this.renderer.listen(
        targetEl,
        'mouseleave',
        () => {
          this.deactivate();
        }
      );
    }
  }

  bindScrollListener(): void {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(
        this.el.nativeElement,
        () => {
          if (this.container) {
            this.hide();
          }
        }
      );
    }
  }

  updateText(): void {
    if (this.tooltipText) {
      if (this.getOption('escape')) {
        this.tooltipText.innerHTML = '';
        this.tooltipText.appendChild(
          document.createTextNode(this.getOption('tooltipLabel'))
        );
      } else {
        this.tooltipText.innerHTML = this.getOption('tooltipLabel');
      }
    } else {
      throw new Error(
        `The tooltip text need to be create before add innerHTML and appendChild in updateText()`
      );
    }
  }

  isOutOfBounds(): boolean {
    if (this.container) {
      const offset = this.container?.getBoundingClientRect();
      const targetTop = offset.top;
      const targetLeft = offset.left;
      const width = DomHandler.getOuterWidth(this.container);
      const height = DomHandler.getOuterHeight(this.container);
      const viewport = DomHandler.getViewport();

      return (
        targetLeft + width > viewport.width ||
        targetLeft < 0 ||
        targetTop < 0 ||
        targetTop + height > viewport.height
      );
    } else {
      throw new Error('The container is undefined in isOutOfBounds()');
    }
  }

  getHostOffset(): { left: number; top: number } {
    if (
      this.getOption('appendTo') === 'body' ||
      this.getOption('appendTo') === 'target'
    ) {
      const offset = (this.el.nativeElement as Element).getBoundingClientRect();
      const targetLeft = offset.left + DomHandler.getWindowScrollLeft();
      const targetTop = offset.top + DomHandler.getWindowScrollTop();
      return { left: targetLeft, top: targetTop };
    } else {
      return { left: 0, top: 0 };
    }
  }

  preAlign(position: TooltipPosition): void {
    if (this.container) {
      this.container.style.left = -999 + 'px';
      this.container.style.top = -999 + 'px';

      const defaultClassName =
        'ctv-tooltip ctv-component ctv-tooltip-' + position;
      this.container.className = this.getOption('tooltipStyleClass')
        ? defaultClassName + ' ' + this.getOption('tooltipStyleClass')
        : defaultClassName;
    } else {
      throw new Error('The container is undefined in preAlign()');
    }
  }

  alignTop(): void {
    if (this.container) {
      this.preAlign('top');
      const hostOffset = this.getHostOffset();
      const left =
        hostOffset.left +
        (DomHandler.getOuterWidth(this.el.nativeElement) -
          DomHandler.getOuterWidth(this.container)) /
          2;
      const top = hostOffset.top - DomHandler.getOuterHeight(this.container);
      this.container.style.left =
        left + (this.getOption('positionLeft') as number) + 'px';
      this.container.style.top =
        top + (this.getOption('positionTop') as number) + 'px';
    } else {
      throw new Error('The container is undefined in AlignTop()');
    }
  }

  alignBottom(): void {
    if (this.container) {
      this.preAlign('bottom');
      const hostOffset = this.getHostOffset();
      const left =
        hostOffset.left +
        (DomHandler.getOuterWidth(this.el.nativeElement) -
          DomHandler.getOuterWidth(this.container)) /
          2;
      const top =
        hostOffset.top + DomHandler.getOuterHeight(this.el.nativeElement);
      this.container.style.left = left + this.getOption('positionLeft') + 'px';
      this.container.style.top = top + this.getOption('positionTop') + 'px';
    } else {
      throw new Error('The container is undefined in AlignBottom()');
    }
  }

  alignRight(): void {
    if (this.container) {
      this.preAlign('right');
      const hostOffset = this.getHostOffset();
      const left =
        hostOffset.left + DomHandler.getOuterWidth(this.el.nativeElement);
      const top =
        hostOffset.top +
        (DomHandler.getOuterHeight(this.el.nativeElement) -
          DomHandler.getOuterHeight(this.container)) /
          2;
      this.container.style.left = left + this.getOption('positionLeft') + 'px';
      this.container.style.top = top + this.getOption('positionTop') + 'px';
    } else {
      throw new Error('The container is undefined in AlignRight()');
    }
  }

  alignLeft(): void {
    if (this.container) {
      this.preAlign('left');
      const hostOffset = this.getHostOffset();
      const left = hostOffset.left - DomHandler.getOuterWidth(this.container);
      const top =
        hostOffset.top +
        (DomHandler.getOuterHeight(this.el.nativeElement) -
          DomHandler.getOuterHeight(this.container)) /
          2;
      this.container.style.left = left + this.getOption('positionLeft') + 'px';
      this.container.style.top = top + this.getOption('positionTop') + 'px';
    } else {
      throw new Error('The container is undefined in AlignLeft()');
    }
  }

  alignPositionTop(): void {
    this.alignTop();
    if (this.isOutOfBounds()) {
      this.alignBottom();
      if (this.isOutOfBounds()) {
        this.alignRight();
        if (this.isOutOfBounds()) {
          this.alignLeft();
        }
      }
    }
  }

  alignPositionBottom(): void {
    this.alignBottom();
    if (this.isOutOfBounds()) {
      this.alignTop();
      if (this.isOutOfBounds()) {
        this.alignRight();
        if (this.isOutOfBounds()) {
          this.alignLeft();
        }
      }
    }
  }

  alignPositionLeft(): void {
    this.alignLeft();
    if (this.isOutOfBounds()) {
      this.alignRight();
      if (this.isOutOfBounds()) {
        this.alignTop();
        if (this.isOutOfBounds()) {
          this.alignBottom();
        }
      }
    }
  }

  alignPositionRight(): void {
    this.alignRight();
    if (this.isOutOfBounds()) {
      this.alignLeft();
      if (this.isOutOfBounds()) {
        this.alignTop();
        if (this.isOutOfBounds()) {
          this.alignBottom();
        }
      }
    }
  }

  align(): void {
    const position: TooltipPosition = this.getOption(
      'tooltipPosition'
    ) as TooltipPosition;

    switch (position) {
      case 'top':
        this.alignPositionTop();
        break;
      case 'bottom':
        this.alignPositionBottom();
        break;
      case 'left':
        this.alignPositionLeft();
        break;
      case 'right':
        this.alignPositionRight();
        break;
    }
  }

  clearShowTimeout(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
  }

  clearHideTimeout(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  remove(): void {
    if (this.container?.parentElement) {
      if (this.getOption('appendTo') === 'body') {
        document.body.removeChild(this.container);
      } else if (this.getOption('appendTo') === 'target') {
        (this.el.nativeElement as Element).removeChild(this.container);
      } else {
        DomHandler.removeChild(this.container, this.getOption('appendTo'));
      }
    }

    this.unbindDocumentResizeListener();
    this.unbindScrollListener();
    this.unbindContainerMouseLeaveListener();
    this.clearTimeouts();
    this.container = null;
    this.scrollHandler = null;
  }

  clearTimeouts(): void {
    this.clearShowTimeout();
    this.clearHideTimeout();
  }

  isAutoHide(): boolean {
    return this.getOption('autoHide');
  }

  unbindContainerMouseLeaveListener(): void {
    if (this.containerMouseLeaveListener) {
      this.bindContainerMouseLeaveListener();
      this.containerMouseLeaveListener = null;
    }
  }

  unbindScrollListener(): void {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener();
    }
  }

  unbindDocumentResizeListener(): void {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      this.resizeListener = null;
    }
  }

  unbindEvents(): void {
    if (
      this.getOption('tooltipEvent') === 'hover' &&
      this.mouseEnterListener &&
      this.mouseLeaveListener &&
      this.clickListener
    ) {
      this.el.nativeElement.removeEventListener(
        'mouseenter',
        this.mouseEnterListener
      );
      this.el.nativeElement.removeEventListener(
        'mouseleave',
        this.mouseLeaveListener
      );
      this.el.nativeElement.removeEventListener('click', this.clickListener);
    } else if (
      this.getOption('tooltipEvent') === 'focus' &&
      this.focusListener &&
      this.blurListener
    ) {
      const target = this.getTarget(this.el.nativeElement);

      if (target) {
        target.removeEventListener('focus', this.focusListener);
        target.removeEventListener('blur', this.blurListener);
      } else {
        throw new Error('The target is undefined in unbindEvents()');
      }
    }
  }

  ngOnDestroy(): void {
    this.unbindEvents();

    if (this.container) {
      ZIndexUtils.clear(this.container);
    }

    this.remove();

    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
  }
}
