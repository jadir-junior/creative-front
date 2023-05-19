import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TableService {
  private valueSource = new Subject<any>();
  private columnsSource = new Subject();

  valueSource$ = this.valueSource.asObservable();
  columnsSource$ = this.columnsSource.asObservable();

  onValueChange(value: any): void {
    this.valueSource.next(value);
  }

  onColumnsChange(columns: any[] | undefined): void {
    this.columnsSource.next(columns);
  }
}
