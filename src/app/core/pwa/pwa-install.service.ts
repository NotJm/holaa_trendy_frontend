import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted'|'dismissed'; platform: string }>;
};

@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  private deferredPrompt?: BeforeInstallPromptEvent;
  public canInstall$ = new BehaviorSubject<boolean>(false);
  public installed$ = new BehaviorSubject<boolean>(false);

  constructor() {
    // Mostrar botón cuando el navegador dispare el evento
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e as BeforeInstallPromptEvent;
      this.canInstall$.next(true);
    });

    // Evento cuando la app queda instalada
    window.addEventListener('appinstalled', () => {
      this.installed$.next(true);
      this.canInstall$.next(false);
      this.deferredPrompt = undefined;
    });

    // Si ya está en standalone, no mostramos botón
    const isStandalone =
      window.matchMedia?.('(display-mode: standalone)')?.matches ||
      (navigator as any).standalone === true;

    if (isStandalone) {
      this.canInstall$.next(false);
      this.installed$.next(true);
    }
  }

  async install(): Promise<'accepted'|'dismissed'|'unavailable'> {
    if (!this.deferredPrompt) return 'unavailable';
    this.canInstall$.next(false);
    await this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    this.deferredPrompt = undefined;
    return outcome;
  }
}
