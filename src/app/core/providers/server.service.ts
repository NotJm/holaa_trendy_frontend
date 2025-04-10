import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, timeout } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private readonly API = environment.API;
  private serverAvailable = signal<boolean | null>(null);

  get isAvailable(): boolean | null {
    return this.serverAvailable();
  }

  set isAvailable(status: boolean) {
    this.serverAvailable.set(status)
  }

  constructor(private readonly http: HttpClient) {}

  private ping(timeInSeconds: number = 5000): Observable<boolean> {
    return this.http.get<boolean>(`${this.API}/ping`).pipe(
      timeout(timeInSeconds),
      map((pong) => {
        this.serverAvailable.set(pong)
        return pong;
      }),
      catchError(() => {
        this.serverAvailable.set(false);
        return of(false);
      })
    )
  }

  connect(timeInSeconds?: number | undefined): Observable<boolean> {
    return this.ping(timeInSeconds);
  }
}
