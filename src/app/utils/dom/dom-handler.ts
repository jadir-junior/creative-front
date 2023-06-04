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
}
