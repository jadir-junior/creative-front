import {
  AfterContentInit,
  Directive,
  Injector,
  ViewChild,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Directive()
export class BaseSelect<T> implements ControlValueAccessor, AfterContentInit {
  @ViewChild('ngSelect', { static: true }) ngSelect!: NgSelectComponent;

  items: T[] | null = null;
  formControl!: NgControl;
  injector = inject(Injector);

  disabled = false;
  searchable = false;
  clearable = false;
  loading = false;
  placeholder = '';

  bindLabel = 'name';
  bindValue = 'id';

  label?: string;
  id?: string;
  name?: string;

  onChange = (value: string) => {};
  onTouched = () => {};

  ngAfterContentInit(): void {
    this.formControl = this.injector.get(NgControl);
    if (this.formControl !== null) {
      this.formControl.valueAccessor = this;
    }
  }

  writeValue(value: string): void {
    setTimeout(() => {
      if (!value) return;

      this.ngSelect.writeValue(value);
    });
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelect(value: { [k: string]: string } | undefined) {
    this.onTouched();

    if (typeof value === 'undefined') {
      return this.onChange('');
    }

    this.onChange(value[this.bindValue]);
  }

  onBlur(): void {
    this.onTouched();
  }

  onClose(): void {
    this.onTouched();
  }

  get isError(): boolean {
    if (
      this.formControl.invalid &&
      (this.formControl.dirty || this.formControl.touched)
    ) {
      return true;
    }

    return false;
  }
}
