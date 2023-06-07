import { TestBed } from '@angular/core/testing';

import { BusinessUnitSelectService } from './business-unit-select.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BusinessUnitSelectService', () => {
  let service: BusinessUnitSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BusinessUnitSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
