import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, shareReplay, switchMap, tap } from 'rxjs/operators';
import { IApiResponse } from '../../interfaces/api.response.interface';
import { AuthResponse } from '../../interfaces/auth.interface';
import { IUser, IUserCredentials } from '../../interfaces/users.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  protected override endpoint: string = 'auth';
  /** Handles the logic for user's authentication */
  #authSubject$ = new BehaviorSubject<boolean>(false);
  /** Handles the logic for user's role like admin */
  #adminSubject$ = new BehaviorSubject<boolean>(false);
  /** Handles logic for user's state authentication */
  authState = this.#authSubject$.asObservable();
  /** Handles logic for admin's state authentication */
  adminState = this.#adminSubject$.asObservable();

  private readonly ROLE = {
    ADMIN: 'admin',
    USER: 'user',
    EMPLOYEE: 'employee',
    SUPPORT: 'support',
  };


  constructor() { super() }


  updateAuthState(newState: boolean): void {
    if (this.#authSubject$.value !== newState) {
      console.log(newState);
      this.#authSubject$.next(newState);
    }
  }

  updateAdminState(newState: boolean): void {
    if (this.#adminSubject$.value !== newState) {
      this.#adminSubject$.next(newState);
    }
  }

  /**
   * Endpoint that handle logic about user's authentication
   * @param credentials user's credentials
   * @returns An observable that resolves when the user is successfully logged
   */
  logIn(credentials: IUserCredentials): Observable<IApiResponse> {
    return this.post<IApiResponse>('login', credentials, {
      withCredentials: true,
    }).pipe(
      tap(() => this.updateAuthState(true)),
      switchMap(() => this.checkSession())
    );
  }

  /**
   * Endpoint that handles logic about user's registration
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
      tap(() => {
        this.updateAuthState(false);
        this.updateAdminState(false);
      })
    );
  }

  sendVerificationCode(phone: string): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'send/sms/code',
      { phone },
      { withCredentials: true }
    );
  }

  verifyVerificationCode(
    phone: string,
    code: string
  ): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'verify/sms/code',
      { phone, code },
      { withCredentials: true }
    );
  }

  acoountActivation(token: string): Observable<IApiResponse> {
    return this.get<IApiResponse>(`account/activate/${token}`);
  }

  sendRecoveryLink(email: string): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'send/email/recovery/link',
      { email },
      { withCredentials: true }
    );
  }

  accountVerification(token: string): Observable<IApiResponse | null> {
    return this.post<IApiResponse>(
      `verify/email/link/${token}`,
      {},
      { withCredentials: true }
    );
  }

  checkSession(): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'check/session',
      {},
      { withCredentials: true }
    ).pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true,
      }),
      tap((response: IApiResponse) => {
        if (response.data.role === this.ROLE.ADMIN) {
          this.updateAdminState(true);
        }
      }),
      catchError(() => {
        return of({
          status: 401,
          message: 'Unauthorized',
          data: { authenticated: false },
        } as IApiResponse);
      })
    );
  }

  refreshToken(): Observable<IApiResponse | null> {
    return this.post<IApiResponse>(
      'refresh/session',
      {},
      { withCredentials: true }
    ).pipe(
      tap((response) => {
        if (!response.data.revoked) {
          return this.updateAuthState(false);
        }

        this.updateAuthState(true);
      })
    );
  }

  resetPassword(newPassword: string): Observable<IApiResponse> {
    return this.post<IApiResponse>(
      'reset/password',
      { newPassword },
      { withCredentials: true }
    );
  }

  /**
   * Handles the logic for initializing the forgot password process
   * @summary This method is used to send a forgot password request to the server
   * @param email User's email address
   * @returns An observable that resolves with the authentication response
   */
  forgotPassword(email: string): Observable<AuthResponse> {
    return this.post<AuthResponse>('forgot-password', { email });
  }
}
