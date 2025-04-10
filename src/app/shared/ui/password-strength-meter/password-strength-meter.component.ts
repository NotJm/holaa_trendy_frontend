import { Component, Input } from '@angular/core';
import { PasswordStrength } from '../../../core/providers/password-strength.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-strength-meter',
  standalone: true,
  imports: [CommonModule],
  template: ` <div class="mt-2">
    <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div
        class="h-full transition-all duration-300 ease-in-out"
        [style.width.%]="strength.percentage"
        [style.background-color]="strength.color"
      ></div>
    </div>
    <div class="flex justify-end mt-1">
      <span [style.color]="strength.color" class="text-sm flex items-center">
        {{ strength.status | titlecase }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 ml-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </div>
  </div>`,
})
export class PasswordStrengthMeterComponent {
  @Input() strength: PasswordStrength = {
    score: 0,
    status: 'very-weak',
    color: '#ff4d4f',
    percentage: 20,
  };
}
