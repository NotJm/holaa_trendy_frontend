import { Component, Input } from '@angular/core';

@Component({
  selector: 'service-features',
  imports: [],
  template: `
    <div class="flex items-start space-x-4">
      <div class="shrink-0">
        <span [class]="icon" class="h-12 w-12"> </span>
      </div>
      <div>
        <h3 class="font-cinzel font-bold text-lg mb-2">
          {{ title }}
        </h3>
        <p class="font-popins text-gray-600">
          {{ description }}
        </p>
      </div>
    </div>`,
})
export class ServiceFeaturesComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) icon!: string;
}
