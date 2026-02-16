import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    guard = new AuthGuard(authServiceSpy, routerSpy);
  });

  it('should allow activation when user is logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);

    const canActivate = guard.canActivate();

    expect(canActivate).toBeTruthy();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should block activation and redirect to /auth when user is not logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);

    const canActivate = guard.canActivate();

    expect(canActivate).toBeFalsy();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth']);
  });
});
