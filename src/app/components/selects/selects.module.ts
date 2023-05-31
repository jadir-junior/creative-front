import { NgModule } from '@angular/core';
import { BusinessUnitSelectModule } from './business-unit-select/business-unit-select.module';
import { BaseSelect } from './base-select/base-select.component';

const modules = [BusinessUnitSelectModule];

@NgModule({
  imports: modules,
  providers: [BaseSelect],
  exports: modules,
})
export class SelectsModule {}
