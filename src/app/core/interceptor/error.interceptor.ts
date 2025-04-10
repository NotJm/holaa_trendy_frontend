import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.InternalServerError) {
        router.navigate(['/500']);
      }
      
      if (error.status === HttpStatusCode.BadRequest) {
        router.navigate(['/400'], { state: { fromInterceptor: true } });
      }

      return throwError(() => error);
    }),
  );
};
