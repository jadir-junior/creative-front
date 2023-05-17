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
}
