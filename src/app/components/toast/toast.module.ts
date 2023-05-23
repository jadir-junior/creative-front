import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { ToastItemComponent } from './toast-item.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [ToastComponent, ToastItemComponent],
  imports: [CommonModule, IconModule],
  exports: [ToastComponent],
})
export class ToastModule {}
