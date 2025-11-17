import { Injectable, Signal, WritableSignal, computed, effect, signal } from '@angular/core';

type GeoPermission = 'granted' | 'denied' | 'prompt' | 'unsupported';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  private _permission: WritableSignal<GeoPermission> = signal('prompt');
  private _position = signal<GeolocationPosition | null>(null);
  private _error = signal<GeolocationPositionError | null>(null);
  private _watchId: number | null = null;

  constructor() {
    // Detecta soporte
    if (!('geolocation' in navigator)) {
      this._permission.set('unsupported');
      return;
    }

    // Intenta leer estado inicial del permiso (no todos los navegadores lo exponen)
    // Si no está disponible, mantenemos 'prompt'
    // ts-expect-error types for Permissions API are partial
    if (navigator.permissions?.query) {

      navigator.permissions.query({ name: 'geolocation' }).then((p: PermissionStatus) => {
        this._permission.set(p.state as GeoPermission);
        p.onchange = () => {
          this._permission.set(p.state as GeoPermission);
        };
      }).catch(() => {/* silencioso */});
    }
  }

  permission(): Signal<GeoPermission> {
    return this._permission.asReadonly();
  }

  position(): Signal<GeolocationPosition | null> {
    return this._position.asReadonly();
  }

  error(): Signal<GeolocationPositionError | null> {
    return this._error.asReadonly();
  }

  // Pide ubicación una sola vez
  async requestOnce(options?: PositionOptions): Promise<GeolocationPosition | null> {
    if (!('geolocation' in navigator)) {
      this._permission.set('unsupported');
      return null;
    }
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this._position.set(pos);
          this._error.set(null);
          this._permission.set('granted'); // la mayoría lo marca así tras éxito
          resolve(pos);
        },
        err => {
          this._error.set(err);
          // Algunos navegadores no actualizan Permissions API; inferimos
          if (err.code === err.PERMISSION_DENIED) this._permission.set('denied');
          resolve(null);
        },
        options ?? { enableHighAccuracy: true, maximumAge: 10_000, timeout: 10_000 }
      );
    });
  }

  // Comienza a observar cambios en la ubicación
  startWatch(options?: PositionOptions): void {
    if (!('geolocation' in navigator)) {
      this._permission.set('unsupported');
      return;
    }
    if (this._watchId != null) return;
    this._watchId = navigator.geolocation.watchPosition(
      pos => {
        this._position.set(pos);
        this._error.set(null);
        this._permission.set('granted');
      },
      err => {
        this._error.set(err);
        if (err.code === err.PERMISSION_DENIED) this._permission.set('denied');
      },
      options ?? { enableHighAccuracy: true, maximumAge: 10_000, timeout: 20_000 }
    );
  }

  stopWatch(): void {
    if (this._watchId != null && 'geolocation' in navigator) {
      navigator.geolocation.clearWatch(this._watchId);
      this._watchId = null;
    }
  }
}
