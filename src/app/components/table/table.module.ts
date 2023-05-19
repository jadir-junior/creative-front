import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { CreativeTemplateModule } from '../../directives/creative-template/creative-template.module';
import { TableBodyComponent } from './table-body.component';

@NgModule({
  declarations: [TableComponent, TableBodyComponent],
  imports: [CommonModule, CreativeTemplateModule],
  exports: [TableComponent, TableBodyComponent],
})
export class TableModule {}
