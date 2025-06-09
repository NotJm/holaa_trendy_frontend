import { CommonModule } from '@angular/common';
import {
    Component,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IconControlComponent } from '../controls/icon-control/icon-control.component';

@Component({
  selector: 'navigation-link',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, IconControlComponent],
  templateUrl: './navigation-link.component.html',
})
export class NavigationLinkComponent {
  // Only properties for the link are required, the rest are optional
  @Input({ required: true }) link!: string;
  @Input({ required: true }) linkText!: string;
  @Input({ required: true }) linkClass: string = '';
  @Input() linkActiveClass: string = '';

  // Only properties for custom the link
  @Input() hasIcon?: boolean = false;
  @Input() iconClass?: string;
  @Input() isIconRight: boolean = false;

  // Only other optional properties for example (fragment, hasTooltip, tooltip, etc.)
  @Input() fragment!: string;
  
  constructor(private readonly router: Router) {}

  onRedirectToSection(event: Event): void {
    event.preventDefault();

    if (!this.link) {
      return this.onScrollToSection(event);
    }

    this.router.navigate([this.link], { fragment: this.fragment }).then(() => {
      setTimeout(() => this.onScrollToSection(event), 100);
    });
  }

  onScrollToSection(event: Event): void {
    event.preventDefault();

    const element = document.getElementById(this.fragment);

    const yOffset = -80; // Adjust this value to your needs (e.g., header height)

    if (!element) return;

    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition + yOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }
}
