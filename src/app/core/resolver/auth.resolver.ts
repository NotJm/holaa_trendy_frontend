import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../providers/auth.service';
import { IApiResponse } from '../interfaces/api.response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<boolean> {
  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.checkSession().pipe(
      map((response: IApiResponse) => response.data.authenticate),
      catchError(() => of(false)) 
    );
  }
}