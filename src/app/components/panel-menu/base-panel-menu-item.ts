import { Style } from '../../types/style.type';

import { ChangeDetectorRef } from '@angular/core';
import { QueryParamsHandling } from '@angular/router';
import { DomHandler } from '../../utils/dom/dom-handler';

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
  separator: boolean;
  queryParams: { [k: string]: any };
  queryParamsHandling: QueryParamsHandling;
  routerLinkActiveOptions: any;
  fragment: string;
  preserveFragment: boolean;
  skipLocationChange: boolean;
  replaceUrl: boolean;
  state: { [k: string]: any };
}

export interface AnimationParams {
  transitionParams: string;
  height: string;
}

export interface Animation {
  value: string;
  params: AnimationParams;
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

  onItemKeyDown(event: KeyboardEvent): void {
    let listItem = event.currentTarget as HTMLAnchorElement;

    switch (event.code) {
      case 'Space':
      case 'Enter':
        if (listItem && !DomHandler.hasClass(listItem, 'ctv-disabled')) {
          listItem.click();
        }

        event.preventDefault();
        break;

      default:
        break;
    }
  }
}
