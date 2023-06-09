import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { MessageService } from '../components/toast/message.service';
import { RollbarService } from '../config/rollbar.config';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private messageService: MessageService,
    private injector: Injector
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        const rollbar = this.injector.get(RollbarService);

        console.error(error);
        rollbar.error(new Error(error.message).stack);
        return throwError(() => error);
      })
    );
  }
}
