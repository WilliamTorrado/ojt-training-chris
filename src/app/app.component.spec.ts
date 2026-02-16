import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const routerStub = {
    url: '/home',
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: AuthService, useValue: authServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should detect auth route correctly', () => {
    routerStub.url = '/auth';
    expect(component.isAuthRoute()).toBeTruthy();

    routerStub.url = '/home';
    expect(component.isAuthRoute()).toBeFalsy();
  });

  it('should call logout when menu selection is logout', () => {
    component.handleMenuSelection('logout');
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
