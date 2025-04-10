import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'icon-button-control',
  standalone: true,
  imports: [CommonModule],
  template: `
  <button
    (click)="this.onClick.emit()"
    [ngClass]="customClassButton"
    [disabled]="disableCondition"
    (mouseover)="isHovered = true"
    (mouseleave)="isHovered = false"
    class="flex items-center justify-center gap-2">
    <span [ngClass]="[customClassIcon, isHovered && iconFilled ? iconFilled : icon]"></span>
    {{ textButton }}
  </button>`,
})
export class IconButtonControl {
  @Input({ required: true }) icon!: string;
  @Input() textButton?: string = "BUTTON";
  @Input() iconFilled?: string;
  @Input() disableCondition?: any;
  @Input() customClassButton?: string = "p-2 rounded-full bg-white/80 backdrop-blur-xs hover:text-[#E91E63] transition-all duration-300 group/fav ";
  @Input() customClassIcon?: string = "w-6 h-6"
  @Output() onClick = new EventEmitter<void>();
  isHovered = false;
}
