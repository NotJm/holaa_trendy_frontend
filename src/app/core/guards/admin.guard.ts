import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { IApiResponse } from '../interfaces/api.response.interface';
import { catchError, map, of, take } from 'rxjs';
import { ROLE } from '../constants/constants';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService)

  return authService.checkSession().pipe(
    take(1),
    map((response: IApiResponse) => {
      if (response.data.authenticate && response.data.role === ROLE.ADMIN) {
        return true;
      }
      return router.createUrlTree(['/']);
    }),
    catchError(() => of(router.createUrlTree(['/'])))
  );
};
