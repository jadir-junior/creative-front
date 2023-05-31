import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

const modules = [
  CommonModule,
  NgSelectModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class BaseSelectModule {}
