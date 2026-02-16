import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SharedDataService } from './shared-data.service';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;
  let sharedDataSpy: jasmine.SpyObj<SharedDataService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    sharedDataSpy = jasmine.createSpyObj('SharedDataService', ['refreshForCurrentUser']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: SharedDataService, useValue: sharedDataSpy }
      ]
    });

    service = TestBed.get(AuthService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully with valid credentials', () => {
    service.register('2024001', 'secret');

    const result = service.login('2024001', 'secret');

    expect(result).toBeTruthy();
    expect(localStorage.getItem('token')).toBe('2024001');
  });

  it('should fail login with invalid credentials', () => {
    service.register('2024001', 'secret');

    const result = service.login('2024001', 'wrong-password');

    expect(result).toBeFalsy();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should remove token and navigate to /auth on logout', () => {
    localStorage.setItem('token', '2024001');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth']);
    expect(sharedDataSpy.refreshForCurrentUser).toHaveBeenCalled();
  });
});
