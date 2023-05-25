import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideMenuComponent } from './aside-menu.component';
import { PanelMenuModule } from '../panel-menu/panel-menu.module';

@NgModule({
  declarations: [AsideMenuComponent],
  imports: [CommonModule, PanelMenuModule],
  exports: [AsideMenuComponent],
})
export class AsideMenuModule {}
