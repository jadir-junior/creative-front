import { TestBed } from '@angular/core/testing';

import { BusinessUnitSelectService } from './business-unit-select.service';

describe('BusinessUnitSelectService', () => {
  let service: BusinessUnitSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessUnitSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
