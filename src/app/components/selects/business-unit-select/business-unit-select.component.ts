import {
  Component,
  Input,
  OnInit,
  Provider,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { BaseSelect } from '../base-select/base-select.component';
import {
  BusinessUnit,
  BusinessUnitSelectService,
} from './business-unit-select.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const BUSINESS_UNIT_SELECT_VALUE_ACESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => BusinessUnitSelectComponent),
};

@Component({
  selector: 'ctv-business-unit-select',
  templateUrl: '../base-select/base-select.component.html',
  styleUrls: ['../base-select/base-select.component.css'],
  providers: [BUSINESS_UNIT_SELECT_VALUE_ACESSOR],
  encapsulation: ViewEncapsulation.None,
})
export class BusinessUnitSelectComponent
  extends BaseSelect<BusinessUnit>
  implements OnInit
{
  override bindLabel: string = 'name';
  override bindValue: string = 'id';
  override label = 'Business unit';
  override placeholder = 'Select a business unit...';
  override name = 'Business Unit Local';

  @Input() override id?: string;

  constructor(private businessUnitSelectService: BusinessUnitSelectService) {
    super();
  }

  ngOnInit(): void {
    this.getBusinessUnit();
  }

  getBusinessUnit(): void {
    this.loading = true;
    this.businessUnitSelectService.list().subscribe((response) => {
      this.items = response.data;
      this.loading = false;
    });
  }
}
