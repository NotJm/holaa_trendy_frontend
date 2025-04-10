import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { NOT_AVAILABLE } from '../constants/constants';
import { ServerService } from './server.service';
import { IApiResponse } from '../interfaces/api.response.interface';

export abstract class BaseService {
  readonly #API = environment.API;
  readonly #http = inject(HttpClient);
  readonly #server = inject(ServerService);

  protected abstract endpoint: string;

  protected handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === NOT_AVAILABLE) this.#server.isAvailable = false;

    const errorMessage =
      error.error && error.error.message
        ? error.error.message
        : 'Hubo un problema al momento de procesar la solicitud';

    console.error(`API Error (${error.status}): ${errorMessage}`);

    return throwError(() => new Error(errorMessage));
  }

  // protected abstract handleResponse<T>(response: IApiResponse): T;

  protected get<T>(path: string = '', options: object = {}): Observable<T> {
    return this.#http
      .get<T>(`${this.#API}/${this.endpoint}${path ? `/${path}` : ''}`, options)
      .pipe(catchError(this.handleError));
  }

  protected post<T>(
    path: string = '',
    body: any,
    options: object = {},
  ): Observable<T> {
    return this.#http
      .post<T>(`${this.#API}/${this.endpoint}/${path}`, body, options)
      .pipe(catchError(this.handleError));
  }

  protected put<T>(
    path: string = '',
    body: Partial<any>,
    options: object = {},
  ): Observable<T> {
    return this.#http
      .put<T>(`${this.#API}/${this.endpoint}/${path}`, body, options)
      .pipe(catchError(this.handleError));
  }

  protected delete<T>(
    path: string = '',
    body: any,
    options: object = {},
  ): Observable<T> {
    return this.#http
      .delete<T>(`${this.#API}/${this.endpoint}/${path}`, {
        body: body,
        ...options,
      })
      .pipe(catchError(this.handleError));
  }
}
