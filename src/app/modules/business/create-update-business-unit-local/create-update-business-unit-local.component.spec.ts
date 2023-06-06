import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateBusinessUnitLocalComponent } from './create-update-business-unit-local.component';
import { BusinessUnitSelectModule } from '../../../components/selects/business-unit-select/business-unit-select.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputModule } from '../../../components/input/input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../../../components/button/button.module';
import { NotDataModule } from '../../../components/not-data/not-data.module';

describe('CreateUpdateBusinessUnitLocalComponent', () => {
  let component: CreateUpdateBusinessUnitLocalComponent;
  let fixture: ComponentFixture<CreateUpdateBusinessUnitLocalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateBusinessUnitLocalComponent],
      imports: [
        BusinessUnitSelectModule,
        HttpClientTestingModule,
        InputModule,
        ReactiveFormsModule,
        ButtonModule,
        NotDataModule,
      ],
    });
    fixture = TestBed.createComponent(CreateUpdateBusinessUnitLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
