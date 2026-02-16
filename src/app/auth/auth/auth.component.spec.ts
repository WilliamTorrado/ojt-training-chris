import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthService } from '../../services/auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isLoggedIn',
      'login',
      'register',
      'userExists'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    authServiceSpy.isLoggedIn.and.returnValue(false);
    authServiceSpy.userExists.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AuthComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /home when login succeeds', () => {
    authServiceSpy.login.and.returnValue(true);
    component.idNumber = '2024001';
    component.password = 'secret';

    component.submit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('2024001', 'secret');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.errorMessage).toBe('');
  });

  it('should set error message when login fails', () => {
    authServiceSpy.login.and.returnValue(false);
    component.idNumber = '2024001';
    component.password = 'wrong-password';

    component.submit();

    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Login failed. Wrong password.');
  });

  it('should register locally and switch back to login mode', () => {
    component.isRegistering = true;
    component.idNumber = '2203181';
    component.password = 'test123';

    component.submit();

    expect(authServiceSpy.userExists).toHaveBeenCalledWith('2203181');
    expect(authServiceSpy.register).toHaveBeenCalledWith('2203181', 'test123');
    expect(component.isRegistering).toBeFalsy();
  });
});
