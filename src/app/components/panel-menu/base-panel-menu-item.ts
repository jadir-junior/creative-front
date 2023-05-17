import { Style } from '../../types/style.type';

import { ChangeDetectorRef } from '@angular/core';

export interface MenuItem {
  visible: boolean;
  expanded: boolean;
  disabled: boolean;
  styleClass: string;
  style: Style;
  routerLink: any;
  url: string;
  id: string;
  target: string;
  title: string;
  command?: (event?: { originalEvent: Event; item: MenuItem }) => void;
  items: MenuItem[];
  escape: boolean;
  label: string;
  badge: string;
  badgeStyleClass: string;
}

export class BasePanelMenuItem {
  constructor(private ref: ChangeDetectorRef) {}

  handleClick(event: Event, item: MenuItem): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    item.expanded = !item.expanded;
    this.ref.detectChanges();

    if (!item.url && !item.routerLink) {
      event.preventDefault();
    }

    if (item.command) {
      item.command({
        originalEvent: event,
        item: item,
      });
    }
  }
}
