import { TestBed } from '@angular/core/testing';

import { HandleErrorService } from './handle-error.service';
import { MessageService } from '../../components/toast/message.service';

describe('HandleErrorService', () => {
  let service: HandleErrorService;
  let message: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    service = TestBed.inject(HandleErrorService);
    message = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
