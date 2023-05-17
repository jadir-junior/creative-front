import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateBusinessUnitComponent } from './create-update-business-unit.component';

describe('CreateUpdateBusinessUnitComponent', () => {
  let component: CreateUpdateBusinessUnitComponent;
  let fixture: ComponentFixture<CreateUpdateBusinessUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateBusinessUnitComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateBusinessUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
