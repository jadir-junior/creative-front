import { NgModule } from '@angular/core';
import { PanelMenuModule } from './panel-menu/panel-menu.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { InputModule } from './input/input.module';
import { ButtonModule } from './button/button.module';
import { TableModule } from './table/table.module';
import { CardModule } from './card/card.module';
import { IconModule } from './icon/icon.module';
import { NotDataModule } from './not-data/not-data.module';
import { ProgressSpinnerModule } from './progress-spinner/progress-spinner.module';
import { AsideMenuModule } from './aside-menu/aside-menu.module';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';

const modules = [
  PanelMenuModule,
  SidebarModule,
  InputModule,
  ButtonModule,
  TableModule,
  CardModule,
  IconModule,
  NotDataModule,
  ProgressSpinnerModule,
  AsideMenuModule,
  ConfirmDialogModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class ComponentsModule {}
