import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMenuSubComponent } from './panel-menu-sub.component';

describe('PanelMenuSubComponent', () => {
  let component: PanelMenuSubComponent;
  let fixture: ComponentFixture<PanelMenuSubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelMenuSubComponent],
    });
    fixture = TestBed.createComponent(PanelMenuSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
