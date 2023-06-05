import { ElementRef, TemplateRef } from '@angular/core';
import { Target } from '../../types/target.type';

export class DomHandler {
  public static hasClass(element: HTMLElement, className: string): boolean {
    if (element && className) {
      if (element.classList) {
        return element.classList.contains(className);
      }

      return new RegExp('(^| )' + className + '( |$)', 'gi').test(
        element.className
      );
    }

    return false;
  }

  public static findSingle(
    element: HTMLElement | undefined | null,
    selector: string
  ): HTMLElement | null {
    if (element) {
      return element.querySelector(selector);
    }

    return null;
  }

  public static appendChild(
    element: HTMLElement | undefined | null,
    target: Target
  ) {
    if (this.isElement(target) && element) {
      (target as HTMLElement).appendChild(element);
    } else {
      throw `Cannot append ${target} to ${element}`;
    }
  }

  public static isElement(obj: Target): boolean {
    if (typeof HTMLElement === 'object') {
      if (obj instanceof HTMLElement) {
        return true;
      }

      return false;
    } else {
      if (
        obj &&
        typeof obj === 'object' &&
        obj !== null &&
        (obj as Node).nodeType === 1 &&
        (obj as Node).nodeName === 'string'
      ) {
        return true;
      }

      return false;
    }
  }

  public static addClass(element: HTMLElement, className: string): void {
    if (element && className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += ' ' + className;
      }
    }
  }

  public static removeClass(element: HTMLElement, className: string): void {
    if (element && className) {
      if (element.classList) {
        element.classList.remove(className);
      } else {
        element.className = element.className.replace(
          new RegExp(
            '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
            'gi'
          ),
          ' '
        );
      }
    }
  }

  public static find(element: HTMLElement, selectors: string): HTMLElement[] {
    return Array.from(element.querySelectorAll(selectors));
  }

  public static getFocusableElements(element: HTMLElement): HTMLElement[] {
    let focusableElements: HTMLElement[] = DomHandler.find(
      element,
      `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
       [href]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
       input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
       select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
       textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
       [tabIndex]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]),
       [contenteditable]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]):not(.p-disabled)
      `
    );

    let visibleFocusableElements: HTMLElement[] = [];
    for (let focusableElement of focusableElements) {
      if (
        !!(
          focusableElement.offsetWidth ||
          focusableElement.offsetHeight ||
          focusableElement.getClientRects().length
        )
      ) {
        visibleFocusableElements.push(focusableElement);
      }
    }

    return visibleFocusableElements;
  }

  public static getWindowScrollLeft(): number {
    const doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  }

  public static getWindowScrollTop(): number {
    const doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }

  public static getOuterWidth(el: HTMLElement, margin?: number): number {
    let width = el.offsetWidth;

    if (margin) {
      const style = getComputedStyle(el);
      width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    return width;
  }

  public static getOuterHeight(el: HTMLElement, margin?: number): number {
    let height = el.offsetHeight;

    if (margin) {
      const style = getComputedStyle(el);
      height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    }

    return height;
  }

  public static getViewport(): { width: number; height: number } {
    const element = document.documentElement;
    const body = document.getElementsByTagName('body')[0];
    const width = window.innerWidth || element.clientWidth || body.clientWidth;
    const height =
      window.innerHeight || element.clientHeight || body.clientHeight;

    return { width, height };
  }

  public static removeChild(element: HTMLElement, target: any) {
    if (this.isElement(target)) {
      (target as Element).removeChild(element);
    } else if (target.el && target.el.nativeElement) {
      target.el.nativeElement.removeChild(element);
    } else {
      throw 'Cannot remove ' + element + ' from ' + target;
    }
  }

  public static fadeIn(element: HTMLElement, duration: number): void {
    element.style.opacity = '0';

    let last = +new Date();
    let opacity = 0;

    const tick = () => {
      opacity =
        +element.style.opacity.replace(',', '.') +
        (new Date().getTime() - last) / duration;
      element.style.opacity = opacity.toString();
      last = +new Date();
      if (+opacity < 1) {
        window?.requestAnimationFrame(tick) || setTimeout(tick, 16);
      }
    };

    tick();
  }

  public static getParents(element: Node, parents: Node[] = []): Node[] {
    return element['parentNode'] === null
      ? parents
      : this.getParents(
          element.parentNode,
          parents.concat([element.parentNode])
        );
  }

  public static getScrollableParents(element: HTMLElement): HTMLElement[] {
    const scrollableParents: HTMLElement[] = [];

    if (element) {
      const parents = this.getParents(element);
      const overflowRegex = /(auto|scroll)/;
      const overflowCheck = (node: Element) => {
        const styleDeclaration = window['getComputedStyle'](node, null);
        return (
          overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) ||
          overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) ||
          overflowRegex.test(styleDeclaration.getPropertyValue('overflowY'))
        );
      };

      for (let parent of parents) {
        const scrollSelectors =
          parent.nodeType === 1 &&
          (parent as HTMLElement).dataset['scrollselectors'];

        if (scrollSelectors) {
          const selectors = scrollSelectors.split(',');
          selectors.forEach((selector) => {
            const el = this.findSingle(parent as HTMLElement, selector);
            if (el && overflowCheck(el)) {
              scrollableParents.push(el);
            }
          });
        }
      }
    }

    return scrollableParents;
  }
}
