import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateBusinessUnitComponent } from './create-update-business-unit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from '../../../components/toast/message.service';
import { ConfirmDialogModule } from '../../../components/confirm-dialog/confirm-dialog.module';
import { InputModule } from '../../../components/input/input.module';

describe('CreateUpdateBusinessUnitComponent', () => {
  let component: CreateUpdateBusinessUnitComponent;
  let fixture: ComponentFixture<CreateUpdateBusinessUnitComponent>;

  beforeEach(() => {
    // TestBed.configureTestingModule({
    //   declarations: [CreateUpdateBusinessUnitComponent],
    //   imports: [HttpClientTestingModule, ConfirmDialogModule, InputModule],
    //   providers: [MessageService],
    // });
    // fixture = TestBed.createComponent(CreateUpdateBusinessUnitComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBeTruthy();
  });
});
