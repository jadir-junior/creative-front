import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../../../utils/models/pagination.model';

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

  listBusinessUnits(): Observable<Pagination<BusinessUnit[]>> {
    return this.http.get<Pagination<BusinessUnit[]>>(`/url/api/business-unit`);
  }

  createBusinessUnit(
    businessUnit: BusinessUnitCreate
  ): Observable<BusinessUnit> {
    return this.http.post<BusinessUnit>(`/url/api/business-unit`, businessUnit);
  }

  deleteBusinessUnit(id: string): Observable<any> {
    return this.http.delete(`/url/api/business-unit/${id}`);
  }
}
