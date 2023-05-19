import { Component, Input, TemplateRef } from '@angular/core';
import { TableComponent } from './table.component';

@Component({
  selector: '[ctvTableBody]',
  template: `
    <ng-container>
      <ng-template
        ngFor
        let-rowData
        let-rowIndex="index"
        [ngForOf]="value"
        [ngForTrackBy]="dt.rowTrackBy"
      >
        <ng-container *ngIf="dt.rowGroupMode !== 'rowspan'">
          <ng-container
            *ngTemplateOutlet="
              template;
              context: {
                $implicit: rowData,
                rowIndex: getRowIndex(rowIndex),
                columns: columns
              }
            "
          ></ng-container>
        </ng-container>
      </ng-template>
    </ng-container>
  `,
  styles: [],
})
export class TableBodyComponent {
  _value: any[] | undefined;

  @Input('ctvTableBody') columns: any[] | undefined;
  @Input('ctvTableBodyTemplate') template: TemplateRef<any> | null = null;
  @Input() scrollerOptions: any;

  @Input() get value(): any[] | undefined {
    return this._value;
  }

  set value(val: any[] | undefined) {
    this._value = val;
  }

  constructor(public dt: TableComponent) {}

  getRowIndex(rowIndex: number): number {
    const index = rowIndex;
    return index;
  }
}
