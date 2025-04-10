import { computed, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IApiResponse } from '../interfaces/api.response.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  #avatar = signal<string>('');
  #username = signal<string>('');
  #email = signal<string>('');

  avatar = computed(() => this.#avatar());
  username = computed(() => this.#username());
  email = computed(() => this.#email());

  protected override endpoint: string = 'users';

  getAvatar(): Observable<IApiResponse> {
    return this.get<IApiResponse>('avatar', { withCredentials: true }).pipe(
      tap((response) => {
        if (response.data?.user) {
          this.#avatar.set(response.data.user.avatar);
          this.#username.set(response.data.user.username);
          this.#email.set(response.data.user.email);
        }
      }),
    );
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
    description: string,
  ): Observable<IApiResponse> {
    return this.put<IApiResponse>(
      'update/address',
      { address, postCode, state, municipality, town, colony, description },
      { withCredentials: true },
    );
  }
}
