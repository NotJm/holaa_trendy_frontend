import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { ButtonControlComponent } from "../../../shared/ui/button/button-control.component";
import { InputControlComponent } from "../../../shared/ui/controls/input-control/input-control.component";
import { TextAreaControlComponent } from "../../../shared/ui/controls/textarea-control/textarea-control.component";
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'form-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputControlComponent, ButtonControlComponent, TextAreaControlComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ContactsComponent implements OnInit {
  contactForm!: FormGroup;

  isSubmitting = false;
  submitSuccess = false;

  // --- Geolocalización ---
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly HOLAA_TRENDY = { lat: 21.142935309465617, lng: -98.41968613217519 };
  distanceKm: number | null = null;
  userCoords: { lat: number; lng: number } | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toast: HotToastService,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    if (!this.isBrowser) return; // SSR/prerender safe

    // (Opcional: consultar permiso para ajustar UX)
    // No bloquea; solo informativo.
    (navigator as any).permissions?.query?.({ name: 'geolocation' as PermissionName })
      .then((status: PermissionStatus) => {
        // Si está 'denied', avisamos de una vez
        if (status.state === 'denied') {
          this.toast.error(
            'Permiso de ubicación denegado. Actívalo en tu navegador para ver la distancia.',
            { position: 'top-right', duration: 4000, ariaLive: 'assertive' }
          );
        }
      })
      .catch(() => { /* silencioso: no todos los navegadores soportan Permissions API */ });

    this.requestLocationOnce();
  }

  private requestLocationOnce(): void {
    if (!('geolocation' in navigator)) {
      this.toast.error('Tu navegador no soporta geolocalización.', {
        position: 'top-right',
        duration: 4000,
        ariaLive: 'assertive',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        this.userCoords = { lat: latitude, lng: longitude };

        const d = this.haversineKm(
          latitude,
          longitude,
          this.HOLAA_TRENDY.lat,
          this.HOLAA_TRENDY.lng
        );

        this.distanceKm = Number(d.toFixed(2));

        this.toast.success(`Estás a ${this.distanceKm} km de Holaa Trendy`, {
          position: 'top-right',
          duration: 3500,
        });
      },
      (err) => {
        const msg =
          err.code === err.PERMISSION_DENIED
            ? 'No pudimos obtener tu ubicación: permiso denegado.'
            : err.code === err.POSITION_UNAVAILABLE
            ? 'Ubicación no disponible en este momento.'
            : err.code === err.TIMEOUT
            ? 'Tiempo de espera agotado al solicitar ubicación.'
            : 'Error al obtener ubicación.';
        this.toast.error(`${msg} Verifica permisos y conexión (HTTPS).`, {
          position: 'top-right',
          duration: 5000,
          ariaLive: 'assertive',
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }

  // Distancia en kilómetros (Haversine)
  private haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // radio de la Tierra en km
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // --- Tu form (igual que antes) ---
  submitForm() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      setTimeout(() => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();
        this.toast.success('Gracias por contactarnos. Te responderemos pronto.', {
          position: 'top-right'
        });
        setTimeout(() => (this.submitSuccess = false), 5000);
      }, 2000);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
