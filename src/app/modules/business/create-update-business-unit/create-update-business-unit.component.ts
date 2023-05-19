import { BusinessService } from './../services/business.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-update-business-unit',
  template: `
    <h1>Settings</h1>
    <hr />
    <div class="company-section">
      <div>
        <h3 class="text-lg text-semi-bold">Business unit profile</h3>
        <p class="text-sm text-regular">
          Create your business unit company here
        </p>
      </div>
      <form
        [formGroup]="form"
        style="margin-top: 1.25rem; width: 100%;"
        (submit)="onSubmit(form)"
      >
        <div style="margin-bottom: 1.5rem">
          <ctv-input
            label="Business unit"
            id="business-unit"
            name="Business unit"
            formControlName="name"
          />
        </div>
        <div
          style="display: flex; gap: 12px; margin-top: 1.25rem; justify-content: flex-end;"
        >
          <ctv-button color="secondary" (onClick)="cancel()">Cancel</ctv-button>
          <ctv-button type="submit">Save</ctv-button>
        </div>
      </form>
    </div>
    <hr />
    <div class="company-section">
      <div>
        <h3 class="text-lg text-semi-bold">Business units</h3>
        <p class="text-sm text-regular">Manage your business units</p>
      </div>
    </div>
  `,
  styles: [
    `
      .company-section {
        padding-top: 2rem;
        padding-bottom: 1.25rem;
        display: flex;
        gap: 2rem;
      }
    `,
  ],
})
export class CreateUpdateBusinessUnitComponent {
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService
  ) {}

  cancel(): void {}

  onSubmit({ value }: FormGroup): void {
    this.businessService.createBusinessUnit(value).subscribe((response) => {
      console.log(response);
    });
  }
}
