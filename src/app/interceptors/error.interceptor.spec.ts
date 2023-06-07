import { TestBed } from '@angular/core/testing';

import { ErrorInterceptor } from './error.interceptor';
import { MessageService } from '../components/toast/message.service';

describe('ErrorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ErrorInterceptor, MessageService],
    })
  );

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
