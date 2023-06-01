import { NgModule } from '@angular/core';
import { BusinessUnitSelectComponent } from './business-unit-select.component';
import { BaseSelectModule } from '../base-select/base-select.module';

const modules = [BaseSelectModule];

@NgModule({
  declarations: [BusinessUnitSelectComponent],
  imports: modules,
  exports: [BusinessUnitSelectComponent],
})
export class BusinessUnitSelectModule {}
