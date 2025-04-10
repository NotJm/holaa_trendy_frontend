import { Platform } from '@angular/cdk/platform';
import { Injectable, signal } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeforeLoadingService {
  private readonly timeout = signal<NodeJS.Timeout | undefined>(undefined);
  private readonly cookiesReady = signal<boolean>(false);
  private readonly checkInterval: number = 500;
  private readonly maxAttempts: number = 3;
  private attempts: number = 0;

  constructor(private readonly platform: Platform) {}

  private checkCookies(cookieCheck?: () => boolean): void {

    if (cookieCheck) {
      return this.cookiesReady.set(cookieCheck?.());
    }

    if (!document.cookie) {
      return this.cookiesReady.set(false);
    }

    this.cookiesReady.set(true);
  }

  waitForCookies({
    callback,
    cookieCheck,
    interval = this.checkInterval,
  }: {
    callback: () => void;
    cookieCheck?: () => boolean;
    interval?: number;
  }): void {
    this.checkCookies(cookieCheck);


    if (this.cookiesReady()) {
      clearTimeout(this.timeout());
      return callback();
    }

    this.attempts++;

    if (this.attempts >= this.maxAttempts) {
      return clearTimeout(this.timeout());
    }

    this.timeout.set(
      setTimeout(
        () => this.waitForCookies({ callback, cookieCheck, interval }),
        interval
      )
    );
  }


  waitForApi({
    callback,
    sub,
    interval = this.checkInterval,
  }: {
    callback: () => void;
    sub: Subscription;
    interval?: number;
  }): void {
    if (sub) {
      sub.unsubscribe();
    }


    
  }

  clearTimeout(): void {
    if (this.timeout()) {
      clearTimeout(this.timeout());
      this.timeout.set(undefined);
    }
  }
}
