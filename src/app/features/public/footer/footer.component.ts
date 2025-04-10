import { Component, computed, OnInit } from '@angular/core';
import { FooterService } from '../../../core/providers/footer.service';
import { CommonModule } from '@angular/common';
import { NavigationLinkComponent } from '../../../shared/ui/navigation-link/navigation-link.component';
import { ButtonControlComponent } from '../../../shared/ui/button/button-control.component';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, NavigationLinkComponent, ButtonControlComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {

  /** A signal for handling the logic to show/hidden the navbar */
  isVisible = computed(() => this.footerService.visible())

  constructor(private readonly footerService: FooterService) {}

}
