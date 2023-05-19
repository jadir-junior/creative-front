import { NgModule } from '@angular/core';
import { PanelMenuModule } from './panel-menu/panel-menu.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { InputModule } from './input/input.module';

const modules = [PanelMenuModule, SidebarModule, InputModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class ComponentsModule {}
