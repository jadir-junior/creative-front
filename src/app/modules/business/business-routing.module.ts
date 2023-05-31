import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUpdateBusinessUnitComponent } from './create-update-business-unit/create-update-business-unit.component';
import { CreateUpdateBusinessUnitLocalComponent } from './create-update-business-unit-local/create-update-business-unit-local.component';

const routes: Routes = [
  {
    path: 'business/create-business-unit',
    component: CreateUpdateBusinessUnitComponent,
  },
  {
    path: 'business/create-business-unit-local',
    component: CreateUpdateBusinessUnitLocalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule {}
