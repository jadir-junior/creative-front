import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Animation, BasePanelMenuItem, MenuItem } from './base-panel-menu-item';
import { state, style, trigger } from '@angular/animations';
import { PanelMenuComponent } from './panel-menu.component';

@Component({
  selector: 'ctv-panel-menu-sub',
  template: `<ul
    [ngClass]="{
      'ctv-submenu-list': true,
      'ctv-panelmenu-root-submenu': root,
      'ctv-submenu-expanded': expanded
    }"
    [@submenu]="getAnimation()"
    role="tree"
  >
    <ng-template ngFor let-child [ngForOf]="item.items">
      <li
        *ngIf="child.separator"
        class="ctv-menu-separator"
        role="separator"
      ></li>
      <li
        *ngIf="!child.separator"
        class="ctv-menuitem"
        [ngClass]="child.styleClass"
        [class.ctv-hidden]="child.visible === false"
        [ngStyle]="child.style"
      >
        <a
          *ngIf="child.routerLink"
          (keydown)="onItemKeyDown($event)"
          [routerLink]="child.routerLink"
          [queryParams]="child.queryParams"
          [routerLinkActive]="'ctv-menuitem-link-active'"
          [routerLinkActiveOptions]="
            child.routerLinkActiveOptions || { exact: false }
          "
          class="ctv-menuitem-link"
          [ngClass]="{ 'ctv-disabled': child.disabled }"
          [attr.tabindex]="
            !item.expanded || !parentExpanded
              ? null
              : child.disabled
              ? null
              : '0'
          "
          [attr.id]="child.id"
          role="treeitem"
          [attr.aria-expanded]="child.expanded"
          (click)="handleClick($event, child)"
          [target]="child.target"
          [attr.title]="child.title"
          [fragment]="child.fragment"
          [queryParamsHandling]="child.queryParamsHandling"
          [preserveFragment]="child.preserveFragment"
          [skipLocationChange]="child.skipLocationChange"
          [replaceUrl]="child.replaceUrl"
          [state]="child.state"
        >
          <ng-container *ngIf="child.items">
            <!-- implement icons -->
            <ng-template
              *ngTemplateOutlet="panelMenu.submenuIconTemplate"
            ></ng-template>
          </ng-container>
          <!-- implement icon -->
          <span
            class="ctv-menuitem-text"
            *ngIf="child.escape !== false; else htmlRouteLabel"
            >{{ child.label }}</span
          >
          <ng-template #htmlRouteLabel
            ><span class="ctv-menuitem-text" [innerHTML]="child.label"></span
          ></ng-template>
          <span
            class="ctv-menuitem-badge"
            *ngIf="child.badge"
            [ngClass]="child.badgeStyleClass"
            >{{ child.badge }}</span
          >
        </a>
        <ctv-panel-menu-sub
          [item]="child"
          [parentExpanded]="expanded && parentExpanded"
          [expanded]="child.expanded"
          [transtionOptions]="transtionOptions"
          *ngIf="child.items"
        ></ctv-panel-menu-sub>
      </li>
    </ng-template>
  </ul>`,
  animations: [
    trigger('submenu', [
      state('hidden', style({ height: '0' })),
      state('visible', style({ height: '*' })),
    ]),
  ],
})
export class PanelMenuSubComponent extends BasePanelMenuItem {
  @Input() item!: MenuItem;
  @Input() expanded = false;
  @Input() parentExpanded = false;
  @Input() root = false;
  @Input() transtionOptions = '';

  constructor(cf: ChangeDetectorRef, public panelMenu: PanelMenuComponent) {
    super(cf);
  }

  getAnimation(): Animation {
    return this.expanded
      ? {
          value: 'visible',
          params: { transitionParams: this.transtionOptions, height: '*' },
        }
      : {
          value: 'hidden',
          params: { transitionParams: this.transtionOptions, height: '0' },
        };
  }
}
