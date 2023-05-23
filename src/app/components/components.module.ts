import { NgModule } from '@angular/core';
import { PanelMenuModule } from './panel-menu/panel-menu.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { InputModule } from './input/input.module';
import { ButtonModule } from './button/button.module';
import { TableModule } from './table/table.module';
import { CardModule } from './card/card.module';
import { IconModule } from './icon/icon.module';

const modules = [
  PanelMenuModule,
  SidebarModule,
  InputModule,
  ButtonModule,
  TableModule,
  CardModule,
  IconModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class ComponentsModule {}
