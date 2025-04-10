import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  OnDestroy,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from './core/providers/auth.service';
import { ServerService } from './core/providers/server.service';
import { FooterComponent } from './features/public/footer/footer.component';
import { NavbarComponent } from './features/public/navbar/navbar.component';
import { MaintenanceComponent } from './shared/maintenance/maintenance.component';

@Component({
  selector: 'app-root',
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

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly serverService: ServerService,
    private readonly authService: AuthService,
  ) {}

  onActivate() {
    this.isRouterOutletLoaded.set(true);
  }

  onDesactivate() {
    this.isRouterOutletLoaded.set(false);
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeAuthState(): void {
    this.authService.checkSession().pipe(takeUntil(this.destroy$)).subscribe();
  }
}
