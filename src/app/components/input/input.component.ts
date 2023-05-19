import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'ctv-input',
  template: `
    <div class="ctv-input-container">
      <label
        *ngIf="label"
        [attr.for]="id"
        class="ctv-input-label text-sm text-medium"
      >
        {{ label }}
      </label>
      <input
        #input
        class="ctv-input"
        [ngClass]="{
          'ctv-input-error': isError,
        }"
        [type]="type"
        [value]="value"
        [disabled]="disabled"
        [attr.id]="id"
        [attr.placeholder]="placeholder"
        [attr.name]="name"
        (change)="onChange(input.value)"
        (blur)="onBlur()"
      />
      <div *ngIf="isError" class="ctv-input-error-message text-sm text-regular">
        <span *ngIf="ngControl.errors?.['required']">
          {{ name }} is required!
        </span>
        <span *ngIf="ngControl.errors?.['email']">
          {{ name }} is invalid!
        </span>
      </div>
    </div>
  `,
  styleUrls: ['./input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'email' = 'text';
  @Input() id?: string;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() submitted = false;
  @Input() name?: string;

  value?: string | undefined;
  disabled = false;

  onChange!: (value: string) => void;
  onTouched!: () => void;

  constructor(public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get isError(): boolean {
    if (
      this.ngControl.invalid &&
      (this.submitted || this.ngControl.dirty || this.ngControl.touched)
    ) {
      return true;
    }

    return false;
  }

  writeValue(value: string | any): void {
    if (value instanceof Object) {
      this.value = value.value;
      return;
    }

    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onBlur(): void {
    this.onTouched();
  }
}
