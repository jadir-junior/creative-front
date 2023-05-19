import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Style } from '../../types/style.type';
import { TableService } from './table.service';
import { CreativeTemplate } from '../../directives/creative-template/creative-template.directive';

@Component({
  selector: 'ctv-table',
  template: `
    <div
      [ngStyle]="style"
      [class]="styleClass"
      [ngClass]="classesContainer"
      [attr.id]="id"
    >
      <div class="ctv-datatable-wrapper">
        <ng-container
          *ngTemplateOutlet="
            buildInTable;
            context: { $implicit: processedData, options: { columns } }
          "
        ></ng-container>

        <ng-template #buildInTable let-items let-scrollerOptions="options">
          <table
            #table
            role="table"
            [ngClass]="classesTable"
            [class]="tableStyleClass"
            [style]="tableStyle"
            [attr.id]="id + '_table'"
          >
            <thead #thead class="ctv-datatable-thead">
              <ng-container
                *ngTemplateOutlet="
                  headerTemplate;
                  context: { $implicit: scrollerOptions.columns }
                "
              ></ng-container>
            </thead>
            <tbody
              class="ctv-datatable-tbody"
              [ngClass]="scrollerOptions.contentStyleClass"
              [style]="scrollerOptions.contentStyle"
              [value]="dataToRender(scrollerOptions.rows)"
              [ctvTableBody]="scrollerOptions.columns"
              [ctvTableBodyTemplate]="bodyTemplate"
              [scrollerOptions]="scrollerOptions"
            ></tbody>
          </table>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [TableService],
})
export class TableComponent implements OnChanges, AfterContentInit {
  @ContentChildren(CreativeTemplate) templates?: QueryList<CreativeTemplate>;

  @Input() style: Style;
  @Input() styleClass = '';
  @Input() id?: string;
  @Input() tableStyleClass = '';
  @Input() tableStyle: Style;
  @Input() rowTrackBy = (index: number, item: any) => item;
  @Input() rowGroupMode: 'subheader' | 'rowspan' | undefined = undefined;

  @Input() get value(): any[] {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
  }

  @Input() get columns(): any[] | undefined {
    return this._columns;
  }

  set columns(cols: any[] | undefined) {
    this._columns = cols;
  }

  get processedData() {
    return this.value || [];
  }

  get classesContainer() {
    return {
      'ctv-datatable ctv-component': true,
    };
  }

  get classesTable() {
    return {
      'ctv-datatable-table': true,
    };
  }

  _value: any[] = [];
  _columns: any[] | undefined;

  headerTemplate: TemplateRef<any> | null = null;
  bodyTemplate: TemplateRef<any> | null = null;

  constructor(public tableService: TableService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this._value = changes['value'].currentValue;

      this.tableService.onValueChange(this._value);
    }

    if (changes['columns']) {
      this._columns = changes['columns'].currentValue;

      this.tableService.onColumnsChange(this._columns);
    }
  }

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.template;
          break;

        case 'body':
          this.bodyTemplate = item.template;
          break;
      }
    });
  }

  dataToRender(data: any): any {
    const _data = data || this.processedData;

    return _data;
  }
}
