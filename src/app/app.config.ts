import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptor/error.interceptor';
import { provideCountdown } from 'ngx-countdown';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { WINDOW } from './core/constants/constants';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { authInterceptor } from './core/interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: WINDOW, useFactory: () => window},
    provideHotToastConfig(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideCountdown({ format: 'mm:ss' }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withPreloading(QuicklinkStrategy),
    ),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([errorInterceptor])), provideCharts(withDefaultRegisterables()),
  ],
};
