import { BusinessService, BusinessUnit } from './../services/business.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../components/toast/message.service';
import { Column } from '../../../utils/models/pagination.model';

@Component({
  selector: 'app-create-update-business-unit',
  template: `
    <h1>Settings</h1>
    <hr />
    <div class="company-section">
      <div>
        <h3 class="text-lg text-semi-bold">Business unit</h3>
        <p class="text-sm text-regular">
          Create your business unit company here
        </p>
      </div>
      <form
        [formGroup]="form"
        class="ctv-business-form"
        (submit)="onSubmit(form)"
      >
        <div class="ctv-business-form-control">
          <ctv-input
            label="Business unit"
            id="business-unit"
            name="Business unit"
            formControlName="name"
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
        <h3 class="text-lg text-semi-bold">Business units</h3>
        <p class="text-sm text-regular">Manage your business units</p>
      </div>
      <div class="ctv-business-container-table">
        <div class="ctv-business-loading" *ngIf="loading">
          <ctv-progress-spinner label="Loading..."></ctv-progress-spinner>
        </div>
        <ctv-not-data *ngIf="!value.length && !loading"></ctv-not-data>
        <ctv-table
          *ngIf="value.length && !loading"
          [value]="value"
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
                  (onClick)="deleteBusinessUnit(business.id)"
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
export class CreateUpdateBusinessUnitComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  });

  value: BusinessUnit[] = [];
  loading = false;

  cols: Column[] = [
    {
      field: 'name',
      header: 'Name',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getBusinessUnits();
  }

  getBusinessUnits(): void {
    this.loading = true;
    this.businessService.listBusinessUnits().subscribe({
      next: (response) => {
        this.value = response.data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  cancel(): void {}

  onSubmit({ value }: FormGroup): void {
    this.businessService.createBusinessUnit(value).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successfully saved',
        detail: 'The Business unit was saved successfully',
      });
      this.getBusinessUnits();
      this.form.reset();
    });
  }

  deleteBusinessUnit(id: string): void {
    this.businessService.deleteBusinessUnit(id).subscribe(() => {
      this.getBusinessUnits();
    });
  }
}
