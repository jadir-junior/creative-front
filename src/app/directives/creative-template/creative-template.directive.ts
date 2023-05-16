import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ctvTemplate]',
})
export class CreativeTemplate {
  @Input() type = '';
  @Input('ctvTemplate') name = '';

  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name;
  }
}
