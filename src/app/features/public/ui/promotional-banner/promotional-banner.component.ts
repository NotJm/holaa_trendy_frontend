import { Component, Input } from '@angular/core';
import { ButtonControlComponent } from "../../../../shared/ui/button/button-control.component";
import { ImageControlComponent } from "../../../../shared/ui/image-control/image-control.component";

@Component({
  selector: 'promotional-banner',
  standalone: true,
  imports: [ButtonControlComponent, ImageControlComponent],
  templateUrl: './promotional-banner.component.html',
})
export class PromotionalBannerComponent {
    @Input({ required: true }) title!: string;
    @Input({ required: true }) subtitle!: string;
    @Input({ required: true }) discount!: string; 
}
