import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'login/:step/:token',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'signup/:step/:token',
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'request-forgot-password',
    loadComponent: () =>
      import(
        './request-forgot-password/request-forgot-password.component'
      ).then((m) => m.RequestForgotPasswordComponent),
  },
  {
    path: 'request-forgot-password/:step',
    loadComponent: () =>
      import(
        './request-forgot-password/request-forgot-password.component'
      ).then((m) => m.RequestForgotPasswordComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
    canActivate: [authGuard],
  },
];
