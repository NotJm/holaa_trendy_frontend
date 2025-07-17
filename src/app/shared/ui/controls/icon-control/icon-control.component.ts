import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'icon-control',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './icon-control.component.html',
})
export class IconControlComponent {
  // Only optional properties should be optional
  @Input() hasText: boolean = false;
  @Input() textClass?: string;
  @Input() text?: string;
  // Only icon properties for all custom icons
  @Input() iconClass?: string;
  // Only other optional properties for example (hasLink, link, hasTooltip, tooltip, etc.)
  @Input() linkClass?: string;
  @Input() hasLink: boolean = false;
  @Input() isExternalLink: boolean = false;
  @Input() link?: string;
}
