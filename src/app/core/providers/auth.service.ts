import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, interval, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, finalize, shareReplay, switchMap, tap } from 'rxjs/operators';
import { JWT_INTERVAL } from '../constants/constants';
import { IApiResponse } from '../interfaces/api.response.interface';
import { AuthResponse } from '../interfaces/auth.interface';
import { BaseService } from './base.service';
import { IUser, IUserCredentials } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  protected override endpoint: string = 'auth';
  clientAuth$ = new Subject<boolean>();

  #auth = signal<boolean>(false);
  #authSubject$ = new BehaviorSubject<boolean>(false);
  #lastTokenRefresh = signal<Date | null>(null);
  #refreshSubscription: Subscription | null = null;
  #isInitialized = false;

  isAuth = computed(() => this.#auth());

  // protected override handleResponse<T>(response: IApiResponse): T {
  //   return response.data;
  // }


  /**
   * A subject that emits the authentication state of the user
   */
  authState = this.#authSubject$.asObservable();

  constructor() {
    super();
    this.#authSubject$.subscribe((state) => {
      if (state && !this.#isInitialized) {
        this.startTokenRefresh();
        this.#isInitialized = true;
      } else if (!state) {
        this.stopTokenRefresh();
        this.#isInitialized = false;
      }
    });

    // Verificar la sesión al iniciar
    this.checkSession().subscribe({
      next: (response) => {
        if (response.data.authenticate) {
          this.updateAuthState(true);
        }
      },
      error: () => {
        this.updateAuthState(false);
      },
    });
  }

  /**
   * Handles the logic for refreshing the access token
   * @summary This method is used to refresh the access token when it is expired
   */
  private startTokenRefresh(): void {
    this.stopTokenRefresh();

    this.#refreshSubscription = interval(JWT_INTERVAL)
      .pipe(
        switchMap(() => this.refreshToken()),
        catchError(() => {
          this.updateAuthState(false);
          return of(null);
        }),
      )
      .subscribe();
  }

  private stopTokenRefresh(): void {
    if (this.#refreshSubscription) {
      this.#refreshSubscription.unsubscribe();
      this.#refreshSubscription = null;
    }
  }

  updateAuthState(isAuthenticated: boolean): void {
    this.#authSubject$.next(isAuthenticated);
  }

  // Método para forzar el refresco del token
  forceTokenRefresh(): Observable<IApiResponse | null> {
    return this.refreshToken();
  }

  // Método para obtener la última vez que se refrescó el token
  getLastTokenRefresh(): Date | null {
    return this.#lastTokenRefresh();
  }

  forgotPassword(email: string): Observable<AuthResponse> {
    return this.post<AuthResponse>('forgot-password', { email });
  }

  // Método para forzar la actualización del estado
  forceAuthStateUpdate(): void {
    this.checkSession().subscribe({
      next: (response) => {
        if (response.data.authenticate) {
          this.#authSubject$.next(true);
          this.#lastTokenRefresh.set(new Date());
        } else {
          this.#authSubject$.next(false);
        }
      },
      error: () => {
        this.#authSubject$.next(false);
      },
    });
  }

  /**
   * Endpoint that handle logic about user's authentication
   * @param username user's username
   * @param password user's password
   * @returns An observable that resolves when the user is successfully logged
   */
  logIn(credentials: IUserCredentials): Observable<IApiResponse> {
    return this.post<IApiResponse>('login', credentials, {
      withCredentials: true,
    });
  }

  /**
   * Endpoint that handle logic about user's registration
   * @param username user's username
   * @param email user's email account
   * @param password user's password
   * @param phone user's phone
   * @returns A observable that resolves when the user is successfully registered
   */
  signUp(user: IUser): Observable<IApiResponse> {
    return this.post<IApiResponse>('signup', user, {
      withCredentials: true,
    });
  }

  logOut(): Observable<IApiResponse> {
    return this.get<IApiResponse>('logout', { withCredentials: true }).pipe(
      tap(() => this.updateAuthState(false)),
    );
  }

  sendVerificationCode(phone: string): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'send/sms/code',
      { phone },
      { withCredentials: true },
    );
  }

  verifyVerificationCode(
    phone: string,
    code: string,
  ): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'verify/sms/code',
      { phone, code },
      { withCredentials: true },
    );
  }

  acoountActivation(token: string): Observable<IApiResponse> {
    return this.get<IApiResponse>(`account/activate/${token}`);
  }

  sendRecoveryLink(email: string): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'send/email/recovery/link',
      { email },
      { withCredentials: true },
    );
  }

  accountVerification(token: string): Observable<IApiResponse | null> {
    return this.post<IApiResponse>(
      `verify/email/link/${token}`,
      {},
      { withCredentials: true },
    ).pipe(
      tap((response) => {
        if (response.data.authenticate) {
          // Actualizar el estado directamente
          this.#authSubject$.next(true);
          this.#lastTokenRefresh.set(new Date());
          // Iniciar el refresco del token si no está inicializado
          if (!this.#isInitialized) {
            this.startTokenRefresh();
            this.#isInitialized = true;
          }
        } else {
          this.#authSubject$.next(false);
        }
      }),
      catchError(() => {
        this.#authSubject$.next(false);
        return of(null);
      }),
    );
  }

  checkSession(): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'check/session',
      {},
      { withCredentials: true },
    ).pipe(
      shareReplay(1),
      tap((response) => this.updateAuthState(response.data.authenticate)),
      
    );
  }

  refreshToken(): Observable<IApiResponse | null> {
    return this.post<IApiResponse>(
      'refresh/session',
      {},
      { withCredentials: true },
    ).pipe(
      tap((response) => {
        if (response.data.revoke) {
          this.updateAuthState(true);
          this.#lastTokenRefresh.set(new Date());
        } else {
          this.updateAuthState(false);
        }
      }),
      catchError(() => {
        this.updateAuthState(false);
        return of(null);
      }),
    );
  }

  resetPassword(newPassword: string): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'reset/password',
      { newPassword },
      { withCredentials: true },
    );
  }
}
