interface ZIndexes {
  key: string;
  value: number;
}

export class ZIndexUtils {
  static zIndexes: ZIndexes[] = [];

  private static generateZIndex(key: string, baseZIndex: number): number {
    const lastZIndex =
      this.zIndexes.length > 0
        ? this.zIndexes[this.zIndexes.length - 1]
        : { key, value: baseZIndex };
    const newZIndex =
      lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;

    this.zIndexes.push({ key, value: newZIndex });

    return newZIndex;
  }

  private static reverZIndex(zIndex: number): void {
    this.zIndexes = this.zIndexes.filter((i) => i.value !== zIndex);
  }

  private static getZindex(el: HTMLElement): number {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  }

  public static set(key: string, el: HTMLElement, baseZIndex: number): void {
    if (el) {
      el.style.zIndex = String(this.generateZIndex(key, baseZIndex));
    }
  }

  public static clear(el: HTMLElement | undefined): void {
    if (el) {
      this.reverZIndex(this.getZindex(el));
      el.style.zIndex = '';
    }
  }
}
