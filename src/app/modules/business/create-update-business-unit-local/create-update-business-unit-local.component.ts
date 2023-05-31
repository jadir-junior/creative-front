import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Column } from '../../../utils/models/pagination.model';

@Component({
  selector: 'app-create-update-business-unit-local',
  template: `
    <h1>Settings</h1>
    <hr />
    <div class="company-section">
      <div>
        <h3 class="text-lg text-semi-bold">Business unit local</h3>
        <p class="text-sm text-regular">
          Create your business unit local company here
        </p>
      </div>
      <form
        [formGroup]="form"
        class="ctv-business-form"
        (submit)="onSubmit(form)"
      >
        <div class="ctv-business-form-control">
          <ctv-business-unit-select
            id="bu"
            formControlName="businessUnit"
          ></ctv-business-unit-select>
        </div>
        <div class="ctv-business-form-control">
          <ctv-input
            label="Business unit local"
            id="bul"
            name="Business unit local"
            formControlName="businessUnitLocal"
          />
        </div>
        <div class="ctv-business-form-action">
          <ctv-button color="secondary" (onClick)="cancel()">Cancel</ctv-button>
          <ctv-button type="submit">Save</ctv-button>
        </div>
      </form>
    </div>
    <hr />
    <div class="company-section">
      <div>
        <h3 class="text-lg text-semi-bold">Business unit locals</h3>
        <p class="text-sm text-regular">Manage your business unit locals</p>
      </div>
      <div class="ctv-business-container-table">
        <div class="ctv-business-loading" *ngIf="loading">
          <ctv-progress-spinner label="Loading..."></ctv-progress-spinner>
        </div>
        <ctv-not-data
          *ngIf="!businessUnitLocals.length && !loading"
        ></ctv-not-data>
        <ctv-table
          *ngIf="businessUnitLocals.length && !loading"
          [value]="businessUnitLocals"
          [columns]="cols"
          variant="card"
        >
          <ng-template ctvTemplate="header" let-columns>
            <tr>
              <th *ngFor="let col of columns">{{ col.header }}</th>
              <th>Actions</th>
            </tr>
          </ng-template>
          <ng-template ctvTemplate="body" let-business let-columns="columns">
            <tr>
              <td *ngFor="let col of columns">{{ business[col.field] }}</td>
              <td>
                <ctv-button
                  icon="delete"
                  variant="text"
                  color="secondary"
                  [rounded]="true"
                  (onClick)="deleteBusinessUnitLocal(business.id)"
                ></ctv-button>
              </td>
            </tr>
          </ng-template>
        </ctv-table>
      </div>
    </div>
  `,
  styleUrls: ['../create-update-business.css'],
})
export class CreateUpdateBusinessUnitLocalComponent {
  form: FormGroup = this.fb.group({
    businessUnit: ['', [Validators.required]],
    businessUnitLocal: ['', [Validators.required]],
  });

  businessUnitLocals = [];
  loading = false;

  cols: Column[] = [
    {
      header: 'Name',
      field: 'name',
    },
  ];

  constructor(private fb: FormBuilder) {}

  cancel(): void {}

  deleteBusinessUnitLocal(id: string) {}

  onSubmit({ value }: FormGroup): void {
    console.log(value);
  }
}
