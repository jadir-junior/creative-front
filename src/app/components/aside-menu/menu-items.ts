import { MenuItem } from '../panel-menu/base-panel-menu-item';

export const menuItems: MenuItem[] = [
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
