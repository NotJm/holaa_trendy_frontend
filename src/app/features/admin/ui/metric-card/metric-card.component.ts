import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { IconControlComponent } from "../../../../shared/ui/controls/icon-control/icon-control.component";

@Component({
  selector: 'metric-card',
  standalone: true,
  imports: [CommonModule, IconControlComponent],
  template: `<div class="bg-white rounded-lg shadow-md p-6 border-l-4" [ngClass]="borderAccentColor">
  <div class="flex justify-between items-start">
    <div>
      <p class="text-sm font-medium text-gray-500 uppercase">{{ titleCard }}</p>
      <p class="text-2xl font-bold text-gray-800 mt-1">{{ metric }}</p>
      <p class="text-sm text-gray-600 mt-1">{{ measurement }}</p>
    </div>
    <div class="bg-blue-100 p-3 rounded-full">
      <icon-control [iconClass]="iconClass" [ngClass]="textAccentColor" />
    </div>
  </div>
</div>`,
})
export class MetricCardComponent {
  @Input({ required: true }) titleCard!: string
  @Input({ required: true }) metric!: number | string;
  @Input({ required: true }) measurement!: string;
  @Input({ required: true }) iconClass!: string
  @Input({ required: true }) borderAccentColor!: string 
  @Input({ required: true }) textAccentColor!: string 


}