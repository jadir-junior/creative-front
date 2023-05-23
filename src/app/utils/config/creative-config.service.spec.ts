import { TestBed } from '@angular/core/testing';

import { CreativeConfigService } from './creative-config.service';

describe('CreativeConfigService', () => {
  let service: CreativeConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreativeConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
