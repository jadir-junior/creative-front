import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { AsideMenuModule } from './components/aside-menu/aside-menu.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastModule } from './components/toast/toast.module';
import { MessageService } from './components/toast/message.service';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        SidebarModule,
        AsideMenuModule,
        RouterTestingModule,
        ToastModule,
      ],
      providers: [MessageService],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
