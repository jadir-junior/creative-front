import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.interface';

@Injectable()
export class MessageService {
  private messageSource = new Subject<Message | Message[]>();
  private clearSource = new Subject<string | null>();

  message$ = this.messageSource.asObservable();
  clear$ = this.clearSource.asObservable();

  add(message: Message) {
    if (message) {
      this.messageSource.next(message);
    }
  }
}
