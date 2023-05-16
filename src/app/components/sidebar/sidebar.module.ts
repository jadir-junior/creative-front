import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { CreativeTemplateModule } from '../../directives/creative-template/creative-template.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, CreativeTemplateModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
