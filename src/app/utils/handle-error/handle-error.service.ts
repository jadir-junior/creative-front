import { Injectable } from '@angular/core';
import { MessageService } from '../../components/toast/message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor(private messageService: MessageService) {}

  handle(error: HttpErrorResponse): void {
    if (error.status === 504) {
      this.messageService.add({
        severity: 'error',
        summary: error.statusText,
        detail: 'An error occurred while trying access the server',
      });
    }
  }
}
