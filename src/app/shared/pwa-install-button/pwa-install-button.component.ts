import { Component, inject, computed, signal, effect } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { PwaInstallService } from '../../core/pwa/pwa-install.service';
// (Opcional) usa tu librería de toasts si ya la tienes:
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  standalone: true,
  selector: 'app-pwa-install-button',
  imports: [NgIf, AsyncPipe],
  templateUrl: './pwa-install-button.component.html',
  styleUrls: ['./pwa-install-button.component.css']
})
export class PwaInstallButtonComponent {
  private pwa = inject(PwaInstallService);
  private toast = inject(HotToastService, { optional: true });

  // señales derivadas para mostrar/ocultar
  canInstall = signal(false);
  installed = signal(false);

  constructor() {
    this.pwa.canInstall$.subscribe(v => this.canInstall.set(v));
    this.pwa.installed$.subscribe(v => this.installed.set(v));
  }

  async install() {
    const res = await this.pwa.install();
    // feedback opcional
    if (this.toast) {
      if (res === 'accepted') this.toast.success('App instalada 🚀');
      else if (res === 'dismissed') this.toast.info('Instalación cancelada');
      else this.toast.warning('Instalación no disponible');
    }
  }
}
