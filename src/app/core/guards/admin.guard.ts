import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../providers/api/auth.service';
import { catchError, map, of } from 'rxjs';
import { IApiResponse } from '../interfaces/api.response.interface';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService)


  return authService.checkSession().pipe(
    map((response: IApiResponse) => 
      response.data.authenticated && response.data.role === 'admin' 
        ? true 
        : router.createUrlTree(['/'])
    ),
    catchError(() => of(router.createUrlTree(['/'])))
  );
};
