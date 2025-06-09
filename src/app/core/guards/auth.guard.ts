import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../providers/api/auth.service';
import { catchError, map, of } from 'rxjs';
import { IApiResponse } from '../interfaces/api.response.interface';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService)
  
  return authService.checkSession().pipe(
    map((response: IApiResponse) => {
      if (!response.data.authenticated) {
        router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url}})
        return false;
      }
      return true;
    })
  )

};




