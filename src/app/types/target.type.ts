import { ElementRef, TemplateRef } from '@angular/core';

export type Target =
  | HTMLElement
  | Node
  | ElementRef
  | TemplateRef<any>
  | string
  | null
  | undefined;
