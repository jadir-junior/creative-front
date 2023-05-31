import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateBusinessUnitLocalComponent } from './create-update-business-unit-local.component';

describe('CreateUpdateBusinessUnitLocalComponent', () => {
  let component: CreateUpdateBusinessUnitLocalComponent;
  let fixture: ComponentFixture<CreateUpdateBusinessUnitLocalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateBusinessUnitLocalComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateBusinessUnitLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
