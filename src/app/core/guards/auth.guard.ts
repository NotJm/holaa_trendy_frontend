import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { IApiResponse } from '../interfaces/api.response.interface';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService)

  
  return authService.checkSession().pipe(
    map((response: IApiResponse) => {
      if (!response.data.authenticate) {
        return router.createUrlTree(['auth/login']);
      }
      return true;
    }),
    catchError(() => of(router.createUrlTree(['auth/login'])))
  )
};




