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
    @Input({ required: true }) titlePromotional!: string;
    @Input({ required: true }) subtitleMessage!: string;
    @Input({ required: true }) discountPercentage!: string; 
}
