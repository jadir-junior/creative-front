import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ChangeDetectorRef,
  TemplateRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { Style } from '../../types/style.type';
import { BasePanelMenuItem, MenuItem } from './base-panel-menu-item';
import { CreativeTemplate } from '../../directives/creative-template/creative-template.directive';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

interface AnimationParams {
  transitionParams: string;
  height: string;
}

interface Animation {
  value: string;
  params: AnimationParams;
}

@Component({
  selector: 'ctv-panel-menu',
  template: `
    <div
      [class]="styleClass"
      [ngStyle]="style"
      ngClass="ctv-panelmenu ctv-component"
    >
      <ng-container *ngFor="let item of model; let f = first; let l = last">
        <div class="ctv-panelmenu-panel" *ngIf="visible(item)">
          <div
            [ngClass]="{
              'ctv-component ctv-panelmenu-header': true,
              'ctv-highlight': item.expanded,
              'ctv-disbaled': item.disabled
            }"
            [class]="item.styleClass"
            [ngStyle]="item.style"
          >
            <a
              class="ctv-panelmenu-header-link"
              *ngIf="!item.routerLink"
              [attr.href]="item.url"
              [attr.tabindex]="item.disabled ? null : '0'"
              [target]="item.target"
              [attr.title]="item.title"
              [attr.aria-expanded]="item.expanded"
              [attr.id]="item.id + '_header'"
              [attr.aria-controls]="item.id + '_content'"
              (keydown)="onItemKeyDown($event)"
              (click)="handleClick($event, item)"
            >
              <ng-container *ngIf="item.items">
                <ng-container *ngIf="!submenuIconTemplate">
                  <!-- implement icon hard coded chevron-down and chevron-up -->
                </ng-container>
                <ng-template
                  *ngTemplateOutlet="submenuIconTemplate"
                ></ng-template>
              </ng-container>
              <!-- implement icon front the text -->
              <span
                class="ctv-menuitem-text"
                *ngIf="item.escape !== false; else htmlRouteLabel"
              >
                {{ item.label }}
              </span>
              <ng-template #htmlRouteLabel>
                <span class="ctv-menuitem-text" [innerHTML]="item.label"></span>
              </ng-template>
              <span
                class="ctv-menuitem-badge"
                *ngIf="item.badge"
                [ngClass]="item.badgeStyleClass"
              >
                {{ item.badge }}
              </span>
            </a>
          </div>
          <div
            *ngIf="item.items"
            class="ctv-toggleable-content"
            [ngClass]="{ 'ctv-panelmenu-expanded': item.expanded }"
            [@rootItem]="getAnimation(item)"
            (@rootItem.done)="onToggleDone()"
          >
            <div
              class="ctv-panelmenu-content"
              role="region"
              [attr.id]="item.id + '_content'"
              [attr.aria-labelledby]="item.id + '_header'"
            ></div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
  animations: [
    trigger('rootItem', [
      state('hidden', style({ height: 0 })),
      state('visible', style({ height: '*' })),
      transition('viseble <=> hidden', [animate('{{transitionParams}}')]),
      transition('void => *', animate(0)),
    ]),
  ],
  styleUrls: ['./panel-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelMenuComponent
  extends BasePanelMenuItem
  implements AfterContentInit
{
  @ContentChildren(CreativeTemplate) templates?: QueryList<CreativeTemplate>;

  @Input() styleClass = '';
  @Input() style: Style = null;
  @Input() transitionOptions = '400ms cubic-bezier(0.86, 0, 0.7, 1)';

  @Input() model: MenuItem[] = [];

  submenuIconTemplate: TemplateRef<CreativeTemplate> | null = null;
  animating = false;

  constructor(ref: ChangeDetectorRef) {
    super(ref);
  }

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case 'submenuicon':
          this.submenuIconTemplate = item.template;
          break;
      }
    });
  }

  visible(item: MenuItem): boolean {
    return item.visible !== false;
  }

  onItemKeyDown(event: KeyboardEvent): void {
    let listItem = event.currentTarget as HTMLAnchorElement;

    switch (event.code) {
      case 'Space':
      case 'Enter':
        if (listItem) {
          listItem.click();
        }

        event.preventDefault();
        break;

      default:
        break;
    }
  }

  onToggleDone(): void {
    this.animating = false;
  }

  getAnimation(item: MenuItem): Animation {
    return item.expanded
      ? {
          value: 'visible',
          params: {
            transitionParams: this.animating ? this.transitionOptions : '0ms',
            height: '*',
          },
        }
      : {
          value: 'hidden',
          params: { transitionParams: this.transitionOptions, height: '0' },
        };
  }
}
