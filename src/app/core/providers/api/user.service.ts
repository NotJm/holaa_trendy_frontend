import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IApiResponse } from '../../interfaces/api.response.interface';
import { IUserWithAvatar } from '../../interfaces/users.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  protected override endpoint: string = 'users';

  #userSubject = new BehaviorSubject<IUserWithAvatar | null>(null);

  user$ = this.#userSubject.asObservable();

  getUserData(): Observable<IApiResponse> {
    return this.get<IApiResponse>('data', { withCredentials: true }).pipe(
      tap((response: IApiResponse) => this.#userSubject.next(response.data))
    );
  }

  getCachedUser(): IUserWithAvatar | null {
    return this.#userSubject.value;
  }

  getAddress(): Observable<IApiResponse> {
    return this.get<IApiResponse>('address', { withCredentials: true });
  }

  updateAddress(
    address: string,
    postCode: string,
    state: string,
    municipality: string,
    town: string,
    colony: string,
    description: string
  ): Observable<IApiResponse> {
    return this.put<IApiResponse>(
      'update/address',
      { address, postCode, state, municipality, town, colony, description },
      { withCredentials: true }
    );
  }
}
