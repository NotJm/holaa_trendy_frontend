// core/services/network-status.service.ts (o tu ruta actual)
import { Injectable, computed, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent, merge, of } from 'rxjs';
import { mapTo, startWith, distinctUntilChanged, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NetworkStatusService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _online = signal<boolean>(this.isBrowser ? navigator.onLine : true);
  readonly online = computed(() => this._online());

  readonly online$ = (this.isBrowser
    ? merge(
        fromEvent(window, 'online').pipe(mapTo(true)),
        fromEvent(window, 'offline').pipe(mapTo(false)),
      ).pipe(
        startWith(navigator.onLine),
        distinctUntilChanged(),
        shareReplay({ bufferSize: 1, refCount: true }),
      )
    : of(true).pipe(shareReplay({ bufferSize: 1, refCount: true }))
  );

  constructor() {
    if (this.isBrowser) {
      this.online$.subscribe(v => this._online.set(v));
    }
  }
}
