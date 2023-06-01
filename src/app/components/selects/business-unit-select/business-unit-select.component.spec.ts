import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUnitSelectComponent } from './business-unit-select.component';

describe('BusinessUnitSelectComponent', () => {
  let component: BusinessUnitSelectComponent;
  let fixture: ComponentFixture<BusinessUnitSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessUnitSelectComponent]
    });
    fixture = TestBed.createComponent(BusinessUnitSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
