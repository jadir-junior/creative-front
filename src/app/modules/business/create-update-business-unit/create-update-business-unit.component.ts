import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-update-business-unit',
  template: `
    <h1>Settings</h1>
    <hr />
    <div class="company-section">
      <h3 class="text-lg text-semi-bold">Business unit profile</h3>
      <p class="text-sm text-regular">Create your business unit company here</p>
    </div>
    <hr />
    <form [formGroup]="form">
      <div style="margin-bottom: 1.5rem">
        <ctv-input
          label="Email"
          type="email"
          id="email"
          name="Email"
          placeholder="olivia@untitledui.com"
          formControlName="email"
        />
      </div>
      <hr />
      <div style="display: flex; gap:  12px; margin-top: 1.25rem">
        <ctv-button color="secondary">Cancel</ctv-button>
        <ctv-button>Save</ctv-button>
      </div>
    </form>
  `,
  styles: [
    `
      .company-section {
        padding-top: 2rem;
        padding-bottom: 1.25rem;
      }
    `,
  ],
})
export class CreateUpdateBusinessUnitComponent {
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder) {}
}
