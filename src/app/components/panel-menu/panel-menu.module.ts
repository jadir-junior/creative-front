import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuComponent } from './panel-menu.component';
import { PanelMenuSubComponent } from './panel-menu-sub.component';
import { CreativeTemplateModule } from '../../directives/creative-template/creative-template.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from '../icon/icon.module';

const components = [PanelMenuComponent, PanelMenuSubComponent];
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    CreativeTemplateModule,
    RouterModule,
    BrowserAnimationsModule,
    IconModule,
  ],
  exports: components,
})
export class PanelMenuModule {}
