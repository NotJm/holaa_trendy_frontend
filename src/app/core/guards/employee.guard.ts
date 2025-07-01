import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../providers/api/auth.service';
import { catchError, map, of } from 'rxjs';
import { IApiResponse } from '../interfaces/api.response.interface';

export const employeeGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const _authService = inject(AuthService);

  return _authService.checkSession().pipe(
    map((response: IApiResponse) => 
      response.data.authenticated && response.data.role === 'employee'
      ? true
      : router.createUrlTree(['auth/login'])
    ),
    catchError(() => of(router.createUrlTree(['auth/login'])))
  )
};
