import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Confirmation } from './confirm-dialog.component';

@Injectable()
export class ConfirmationService {
  private requireConfirmationSource = new Subject<Confirmation | null>();
  private acceptConfirmationSource = new Subject<Confirmation | null>();

  requireConfirmation$ = this.requireConfirmationSource.asObservable();
  accept$ = this.acceptConfirmationSource.asObservable();

  confirm(confirmation: Confirmation): void {
    this.requireConfirmationSource.next(confirmation);
  }

  close(): void {
    this.requireConfirmationSource.next(null);
  }

  onAccept(): void {
    this.acceptConfirmationSource.next(null);
  }
}
