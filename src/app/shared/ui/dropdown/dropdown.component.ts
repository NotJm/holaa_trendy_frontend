import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dropdown',
  standalone: true,
  imports: [CommonModule],
  template: ` <div class="relative group">
    <button
      (click)="toggleDropdown()"
      (blur)="isDropdownOpen = false"
      class="flex items-center text-[#000000] hover:text-[#E91E63] transition-colors text-lg"
    >
      <svg
        class="w-6 h-6 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
      Categorías
      <svg
        class="w-4 h-4 ml-1 transform transition-transform"
        fill="none"
        [ngClass]="{ 'rotate-180': isDropdownOpen }"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </button>
    <div
      *ngIf="isDropdownOpen"
      [@dropdownAnimation]
      class="absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-hidden"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="categories-menu"
    >
      <div class="py-1" role="none">
        @for(d of data; track d.id) {
          <a
            href="{{ d.link }}"
            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#E91E63] hover:text-white transition-colors duration-200"
            role="menuitem"
          >
            <span class="mr-2">{{ d.icon }}</span>
            {{ d.name }}
          </a>
        }
      </div>
    </div>
  </div>`,
})
export class DropdownComponent {
  @Input({ required: true }) data: any;
}
