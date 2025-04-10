import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading',
  standalone: true,
  template: ` <div
    class="flex flex-col items-center justify-center p-8 min-h-[200px]"
    role="status"
  >
    <div class="relative w-24 h-24">
      <div
        class="absolute inset-0 border-4 border-[#E0E0E0] rounded-full"
      ></div>
      <div
        class="absolute inset-0 border-4 border-t-[#E91E63] rounded-full animate-spin"
      ></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <svg
          class="w-12 h-12 text-[#E91E63]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </div>
    </div>
    <p class="mt-4 text-lg font-medium text-[#000000]">{{ message }}</p>
  </div>`,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate(
          '300ms ease-out',
          keyframes([
            style({ opacity: 0, transform: 'scale(0.9)', offset: 0 }),
            style({ opacity: 1, transform: 'scale(1.05)', offset: 0.7 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 1 }),
          ]),
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'scale(0.9)' }),
        ),
      ]),
    ]),
  ],
  styles: [
    `
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .animate-spin {
        animation: spin 1s linear infinite;
      }
    `,
  ],
})
export class LoadingComponent {
  @Input({ required: true }) message!: string;
}
