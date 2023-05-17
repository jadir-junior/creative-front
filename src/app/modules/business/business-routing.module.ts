import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUpdateBusinessUnitComponent } from './create-update-business-unit/create-update-business-unit.component';

const routes: Routes = [
  {
    path: 'business/create-business-unit',
    component: CreateUpdateBusinessUnitComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule {}
