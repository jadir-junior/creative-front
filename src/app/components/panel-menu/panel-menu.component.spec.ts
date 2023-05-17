import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMenuComponent } from './panel-menu.component';

describe('PanelMenuComponent', () => {
  let component: PanelMenuComponent;
  let fixture: ComponentFixture<PanelMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelMenuComponent]
    });
    fixture = TestBed.createComponent(PanelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
