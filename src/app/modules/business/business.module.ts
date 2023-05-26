import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { CreateUpdateBusinessUnitComponent } from './create-update-business-unit/create-update-business-unit.component';
import { ComponentsModule } from '../../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreativeTemplateModule } from '../../directives/creative-template/creative-template.module';
import { CreateUpdateBusinessUnitLocalComponent } from './create-update-business-unit-local/create-update-business-unit-local.component';

@NgModule({
  declarations: [
    CreateUpdateBusinessUnitComponent,
    CreateUpdateBusinessUnitLocalComponent,
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    CreativeTemplateModule,
  ],
})
export class BusinessModule {}
