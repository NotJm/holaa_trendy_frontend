import { InjectionToken } from "@angular/core";

export const JWT_INTERVAL = 50 * 60 * 1000;

export const NOT_AVAILABLE: number = 0;

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
  EMPLOYEE = 'employee',
  SUPPORT = 'support',
}

export enum REFRESH_BY_ROLE {
  ADMIN = 14 * 60 * 1000,
  EMPLOYEE = 4 * 60 * 1000,
  SUPPORT = 24 * 60 * 1000,
  USER = 59 * 60 * 1000,
}

export const WINDOW = new InjectionToken<Window>('Window', {
  providedIn: 'root',
  factory: () => window
})