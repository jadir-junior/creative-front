import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreativeTemplate } from './creative-template.directive';

@NgModule({
  declarations: [CreativeTemplate],
  imports: [CommonModule],
  exports: [CreativeTemplate],
})
export class CreativeTemplateModule {}
