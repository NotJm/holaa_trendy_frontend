import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'icon-link-control',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a
      [routerLink]="link"
      class="text-[#000000] hover:text-[#E91E63] transition-colors"
    >
      <span
        [ngClass]="['w-7', 'h-7', isHovered && iconFilled ? iconFilled : icon]"
      ></span>
    </a>
  `,
})
export class IconLinkControlComponent {
  @Input({ required: true }) icon!: string;
  @Input() iconFilled?: string;
  @Input() link!: string;

  isHovered = false;
}
