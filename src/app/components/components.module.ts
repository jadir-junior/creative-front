import { NgModule } from '@angular/core';
import { PanelMenuModule } from './panel-menu/panel-menu.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { InputModule } from './input/input.module';
import { ButtonModule } from './button/button.module';

const modules = [PanelMenuModule, SidebarModule, InputModule, ButtonModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class ComponentsModule {}
