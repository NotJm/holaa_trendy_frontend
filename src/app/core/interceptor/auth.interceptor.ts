import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../providers/api/auth.service';

/** A flag for controlling the refresh token's process */
let isRefreshing = false;
/** A behavior subject for controlling the reactive's process */
const refreshTokenSubject = new BehaviorSubject<boolean>(false);

/**
 * Handles the logic for intercepting the user's request
 * @param req The original request object (Cannot modify, because it immutable)
 * @param next The next step in the user's request
 * @returns A observable that resolves when the request is sent successfully to the server
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) =>
      handleUnauthorized(error, authService, router, next, req)
    )
  );
};

/**
 * Handles the logic for refreshing the user's token
 * @param error A http error that should be 401 (Unauthorized) for refreshing the user's token
 * @param authService An authService object for sending the user's request
 * @param router A router object for redirecting to the user
 * @param next The next step in the user's request
 * @param req The original request object (Cannot modify, because it immutable)
 * @returns A observable that resolves when the request is sent successfully to the server
 */
function handleUnauthorized(
  error: HttpErrorResponse,
  authService: AuthService,
  router: Router,
  next: HttpHandlerFn,
  req: HttpRequest<unknown>
): Observable<HttpEvent<unknown>> {
  const isCheckSessionUrl = req.url.includes('/auth/check/session');

  if (error.status !== HttpStatusCode.Unauthorized || !isCheckSessionUrl) {
    return throwError(() => error);
  }

  if (isRefreshing) {
    return refreshTokenSubject.pipe(
      filter((refreshed) => refreshed === true),
      take(1),
      switchMap(() => next(req))
    );
  }

  isRefreshing = true;
  refreshTokenSubject.next(false);

  return authService.refreshToken().pipe(
    switchMap(() => handleRefreshing(next, req)),
    catchError((error) => handleError(authService, router, error))
  );
}

function handleRefreshing(
  next: HttpHandlerFn,
  req: HttpRequest<unknown>
): Observable<HttpEvent<unknown>> {
  isRefreshing = false;
  refreshTokenSubject.next(true);
  return next(req);
}

function handleError(
  authService: AuthService,
  router: Router,
  error: unknown
): Observable<never> {
  isRefreshing = false;
  console.error('Fallo al refrescar token', error);
  authService.logOut();
  return throwError(() => error);
}
