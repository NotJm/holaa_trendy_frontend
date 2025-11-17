import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  PLATFORM_ID,
  inject,
  computed,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServerService } from './core/providers/api/server.service';
import { FooterComponent } from './features/public/footer/footer.component';
import { NavbarComponent } from './features/public/navbar/navbar.component';
import { MaintenanceComponent } from './shared/maintenance/maintenance.component';
import { HotToastService } from '@ngxpert/hot-toast';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NetworkStatusService } from './network-status.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MaintenanceComponent,
    NavbarComponent,
    RouterOutlet,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  isServerAvailable = computed(() => this.serverService.isAvailable);
  isRouterOutletLoaded = signal<boolean>(false);
  private destroy$ = new Subject<void>();
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly serverService: ServerService,
    private readonly network: NetworkStatusService,
    private readonly toast: HotToastService,
  ) {}

  onActivate() { this.isRouterOutletLoaded.set(true); }
  onDesactivate() { this.isRouterOutletLoaded.set(false); }

  ngAfterViewInit(): void {
    // ⛔️ No suscribas ni dispares toasts en SSR
    if (this.isBrowser) {
      this.network.online$
        .pipe(
          filter(isOnline => isOnline === false),
          takeUntil(this.destroy$),
        )
        .subscribe(() => {
          this.toast.error(
            'Sin conexión a internet. Algunas funciones no estarán disponibles.',
            {
              position: 'top-right',
              duration: 5000,
              ariaLive: 'assertive',
            }
          );
        });

      // // (Opcional) reconexión:
      // this.network.online$
      //   .pipe(filter(v => v === true), takeUntil(this.destroy$))
      //   .subscribe(() => this.toast.success('Conexión restablecida ✅', { duration: 3000 }));
    }

    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
