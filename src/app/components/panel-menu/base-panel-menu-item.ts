import { Style } from '../../types/style.type';

import { ChangeDetectorRef } from '@angular/core';
import { QueryParamsHandling } from '@angular/router';
import { DomHandler } from '../../utils/dom/dom-handler';

export interface MenuItem {
  badge?: string;
  badgeStyleClass?: string;
  disabled?: boolean;
  expanded?: boolean;
  escape?: boolean;
  fragment?: string;
  icon?: string;
  iconStyle?: Style;
  id?: string;
  items?: MenuItem[];
  label: string;
  preserveFragment?: boolean;
  queryParams?: { [k: string]: any };
  queryParamsHandling?: QueryParamsHandling;
  replaceUrl?: boolean;
  routerLink?: any;
  routerLinkActiveOptions?: any;
  separator?: boolean;
  styleClass?: string;
  style?: Style;
  target?: string;
  url?: string;
  visible?: boolean;
  skipLocationChange?: boolean;
  state?: { [k: string]: any };
  title?: string;
  command?: (event?: { originalEvent: Event; item: MenuItem }) => void;
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
