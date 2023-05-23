import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Pagination } from '../../../utils/models/pagination.model';
import { MessageService } from '../../../components/toast/message.service';
import { HandleErrorService } from '../../../utils/handle-error/handle-error.service';

export interface BusinessUnit {
  id: string;
  name: string;
}

export interface BusinessUnitCreate extends Omit<BusinessUnit, 'id'> {}

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  constructor(
    private http: HttpClient,
    private handleError: HandleErrorService
  ) {}

  listBusinessUnits(): Observable<Pagination<BusinessUnit[]>> {
    return this.http
      .get<Pagination<BusinessUnit[]>>(`/url/api/business-unit`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError.handle(error);
          return of();
        })
      );
  }

  createBusinessUnit(
    businessUnit: BusinessUnitCreate
  ): Observable<BusinessUnit> {
    return this.http
      .post<BusinessUnit>(`/url/api/business-unit`, businessUnit)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError.handle(error);
          return of();
        })
      );
  }

  deleteBusinessUnit(id: string): Observable<any> {
    return this.http.delete(`/url/api/business-unit/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError.handle(error);
        return of();
      })
    );
  }
}
