import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { CreateUpdateBusinessUnitComponent } from './create-update-business-unit/create-update-business-unit.component';

@NgModule({
  declarations: [CreateUpdateBusinessUnitComponent],
  imports: [CommonModule, BusinessRoutingModule],
})
export class BusinessModule {}
