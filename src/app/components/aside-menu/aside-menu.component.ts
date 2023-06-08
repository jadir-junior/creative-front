import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { MenuItem } from '../panel-menu/base-panel-menu-item';
import { NavigationEnd, Router } from '@angular/router';
import { menuItems } from './menu-items';

@Component({
  selector: 'ctv-aside-menu',
  template: `
    <aside><ctv-panel-menu [model]="items"></ctv-panel-menu></aside>
  `,
})
export class AsideMenuComponent implements OnInit, OnDestroy {
  items: MenuItem[] = menuItems;

  routerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUrlAndInitializePanelMenuOptionExpanded();
  }

  getUrlAndInitializePanelMenuOptionExpanded(): void {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.panelMenuInitializeOptionExpanded(event.url);
      });
  }

  panelMenuInitializeOptionExpanded(route: string): void {
    switch (route) {
      case '/business/create-business-unit':
        this.items[0].expanded = true;
        break;
      case '/business/create-business-unit-local':
        this.items[0].expanded = true;
        break;
      case '/business/create-occupation-area':
        this.items[0].expanded = true;
        break;
      default:
        null;
    }
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
