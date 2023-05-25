import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { MenuItem } from '../panel-menu/base-panel-menu-item';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'ctv-aside-menu',
  template: `
    <aside><ctv-panel-menu [model]="items"></ctv-panel-menu></aside>
  `,
  styles: [],
})
export class AsideMenuComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [
    {
      label: 'Business',
      icon: 'factory',
      items: [
        {
          label: 'Business unit',
          routerLink: ['/business/create-business-unit'],
        },
        {
          label: 'Business unit local',
          routerLink: ['/business/create-business-unit-local'],
        },
        {
          label: 'Occupation Area',
          routerLink: ['/business/create-occupation-area'],
        },
      ],
    },
    {
      label: 'Home',
      icon: 'other_houses',
      items: [],
    },
    {
      label: 'Dashboard',
      icon: 'dashboard',
      items: [],
    },
  ];

  routerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.panelMenuInitialize(event.url);
      });
  }

  panelMenuInitialize(route: string): void {
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
