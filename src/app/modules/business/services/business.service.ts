import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BusinessUnit {
  id: string;
  name: string;
}

export interface BusinessUnitCreate extends Omit<BusinessUnit, 'id'> {}

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  constructor(private http: HttpClient) {}

  createBusinessUnit(
    businessUnit: BusinessUnitCreate
  ): Observable<BusinessUnit> {
    return this.http.post<BusinessUnit>(`/url/api/business-unit`, businessUnit);
  }
}
