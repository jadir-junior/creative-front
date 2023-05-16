import { style } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Input,
  TemplateRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';

import { animation, animate } from '@angular/animations';
import { Style } from '../../types/style.type';
import { CreativeTemplate } from '../../directives/creative-template/creative-template.directive';

const showAnimation = animation([
  style({ transform: '{{transforn}}', opacity: 0 }),
  animate('{{transition}}'),
]);

const hideAnimation = animation([
  animate('{{transition}}', style({ trnasform: '{{transforn}}', opacity: 0 })),
]);

type Position = 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'ctv-sidebar',
  template: `
    <div
      role="complementary"
      *ngIf="visible"
      [ngClass]="sidebarClasses"
      [ngStyle]="style"
      [class]="styleClass"
      [attr.aria-modal]="modal"
    >
      <div class="ctv-sidebar-header">
        <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
      </div>
      <div class="ctv-sidebar-content">
        <ng-content></ng-content>
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </div>
      <div class="ctv-sidebar-footer">
        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
      </div>
    </div>
  `,
  styleUrls: ['sidebar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ctv-element',
  },
})
export class SidebarComponent implements AfterContentInit {
  @ContentChildren(CreativeTemplate) templates?: QueryList<CreativeTemplate>;

  @Input() modal = true;
  @Input() style: Style = null;
  @Input() styleClass: string = '';

  visible = true;
  position: Position = 'left';
  fullScreen = false;

  headerTemplate: TemplateRef<CreativeTemplate> | null = null;
  contentTemplate: TemplateRef<CreativeTemplate> | null = null;
  footerTemplate: TemplateRef<CreativeTemplate> | null = null;

  get sidebarClasses() {
    return {
      'ctv-sidebar': true,
      'ctv-sidebar-active': this.visible,
      'ctv-sidebar-left': this.position === 'left' && !this.fullScreen,
    };
  }

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case 'content':
          this.contentTemplate = item.template;
          break;
        case 'header':
          this.headerTemplate = item.template;
          break;
        case 'footer':
          this.footerTemplate = item.template;
          break;
        default:
          this.contentTemplate = item.template;
          break;
      }
    });
  }
}
