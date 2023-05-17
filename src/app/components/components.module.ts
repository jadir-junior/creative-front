import { NgModule } from '@angular/core';
import { PanelMenuModule } from './panel-menu/panel-menu.module';
import { SidebarModule } from './sidebar/sidebar.module';

const modules = [PanelMenuModule, SidebarModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class ComponentsModule {}
