import { Component, Input } from '@angular/core';

@Component({
  selector: 'service-features',
  imports: [],
  template: `
    <div class="flex items-start space-x-4">
      <div class="shrink-0">
        <span [class]="iconClass" class="h-12 w-12"> </span>
      </div>
      <div>
        <h3 class="font-karla font-bold text-lg mb-2">
          {{ titleMessage }}
        </h3>
        <p class="font-karla">
          {{ description }}
        </p>
      </div>
    </div>`,
})
export class ServiceFeaturesComponent {
  @Input({ required: true }) titleMessage!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) iconClass!: string;
}
