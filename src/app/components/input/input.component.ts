import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

type Value = string | undefined | null | { value: Value };

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
        (change)="onInputChange(input.value)"
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

  value?: Value;
  disabled = false;

  onChange!: (value: Value) => void;
  onTouched!: () => void;

  constructor(public ngControl: NgControl, private cd: ChangeDetectorRef) {
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

  writeValue(value: Value): void {
    if (value instanceof Object) {
      this.value = value.value;
      return;
    }

    this.value = value;
    this.cd.detectChanges();
  }

  registerOnChange(fn: (value: Value) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(value: string | undefined | null): void {
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
  }

  onBlur(): void {
    this.onTouched();
  }
}
