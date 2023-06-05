import { DomHandler } from '../dom/dom-handler';

export class ConnectedOverlayScrollHandler {
  element: HTMLElement | null = null;
  listener: (() => void) | null = null;
  scrollableParents: HTMLElement[] = [];

  constructor(element: HTMLElement, listener: () => void) {
    this.element = element;
    listener = listener;
  }

  bindScrollListener(): void {
    if (this.element) {
      this.scrollableParents = DomHandler.getScrollableParents(this.element);
    } else {
      throw new Error('The element is undefined in bindScrollListener()');
    }
  }

  unbindScrollListener(): void {
    if (this.scrollableParents && this.listener) {
      for (let i = 0; i < this.scrollableParents.length; i++) {
        this.scrollableParents[i].removeEventListener('scroll', this.listener);
      }
    }
  }

  destroy(): void {
    this.unbindScrollListener();
    this.element = null;
    this.listener = null;
    this.scrollableParents = [];
  }
}
