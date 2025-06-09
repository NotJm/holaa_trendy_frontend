import { InjectionToken } from "@angular/core";

export const NOT_AVAILABLE: number = 0;

export const WINDOW = new InjectionToken<Window>('Window', {
  providedIn: 'root',
  factory: () => window
})

export type IconPrefix =
  | 'icon-[hugeicons--'
  | 'icon-[mdi--'
  | 'icon-[noto--'
  | 'icon-[tw--'
  | 'icon-[streamline--'
  | 'icon-[twemoji--' 
  | 'icon-[heroicons--'
  | 'icon-[material--'
  | 'icon-[charm--'