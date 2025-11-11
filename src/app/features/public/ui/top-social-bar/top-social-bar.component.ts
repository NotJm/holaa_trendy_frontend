import { Component } from '@angular/core';
import { IconControlComponent } from "../../../../shared/ui/controls/icon-control/icon-control.component";
import { NavigationLinkComponent } from '../../../../shared/ui/navigation-link/navigation-link.component';
import { PwaInstallButtonComponent } from '../../../../shared/pwa-install-button/pwa-install-button.component';

@Component({
  selector: 'top-social-bar',
  standalone: true,
  templateUrl: './top-social-bar.component.html',
  imports: [IconControlComponent, NavigationLinkComponent],
  styles: []
})
export class TopSocialBarComponent {}
