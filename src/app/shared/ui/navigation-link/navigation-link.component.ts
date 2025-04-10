import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'navigation-link',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navigation-link.component.html',
})
export class NavigationLinkComponent {
  @Input({ required: true }) text!: string;
  @Input() linkClass: string = 'flex items-center text-[#000000] hover:text-[#E91E63] transition-colors text-lg cursor-pointer';
  @Input() hasIconClass: boolean = false;
  @Input() isIconRight: boolean = false;
  @Input() iconClass: string = ''
  @Input() fragment!: string;
  @Input() link?: string;

  constructor(
    private readonly router: Router,
  ) {}

  
  redirectToSection(event: Event) {
    event.preventDefault();

    if (this.link) {
      this.router.navigate([this.link], { fragment: this.fragment }).then(() => {
        setTimeout(() => this.scrollToSection(event), 100)
      })
    } else {
      this.scrollToSection(event);
    }
  }

  scrollToSection(event: Event) {
    event.preventDefault();

    const element = document.getElementById(this.fragment);
    if (element) {

      const yOffset = -80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition + yOffset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  }

}
