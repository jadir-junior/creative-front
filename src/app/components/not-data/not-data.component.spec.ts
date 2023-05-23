import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotDataComponent } from './not-data.component';

describe('NotDataComponent', () => {
  let component: NotDataComponent;
  let fixture: ComponentFixture<NotDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotDataComponent]
    });
    fixture = TestBed.createComponent(NotDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
