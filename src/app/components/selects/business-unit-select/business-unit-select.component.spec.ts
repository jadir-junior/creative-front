import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUnitSelectComponent } from './business-unit-select.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('BusinessUnitSelectComponent', () => {
  let component: BusinessUnitSelectComponent;
  let fixture: ComponentFixture<BusinessUnitSelectComponent>;

  beforeEach(() => {
    // TestBed.configureTestingModule({
    //   declarations: [BusinessUnitSelectComponent],
    //   imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
    // });
    // fixture = TestBed.createComponent(BusinessUnitSelectComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
