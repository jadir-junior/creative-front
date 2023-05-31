import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../../../utils/models/pagination.model';

export interface BusinessUnit {
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class BusinessUnitSelectService {
  constructor(private http: HttpClient) {}

  list(): Observable<Pagination<BusinessUnit[]>> {
    return this.http.get<Pagination<BusinessUnit[]>>(`/url/api/business-unit`);
  }
}
