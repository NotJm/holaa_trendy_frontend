import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  signal
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServerService } from './core/providers/api/server.service';
import { FooterComponent } from './features/public/footer/footer.component';
import { NavbarComponent } from './features/public/navbar/navbar.component';
import { MaintenanceComponent } from './shared/maintenance/maintenance.component';
import { AuthService } from './core/providers/api/auth.service';
import { UserService } from './core/providers/api/user.service';

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
export class AppComponent implements AfterViewInit {
  isServerAvailable = computed(() => this.serverService.isAvailable);
  isRouterOutletLoaded = signal<boolean>(false);

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly serverService: ServerService,
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


}
