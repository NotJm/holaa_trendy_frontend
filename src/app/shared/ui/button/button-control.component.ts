import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'button-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-control.component.html',
})
export class ButtonControlComponent {
  @Input() hasIconClass: boolean = false;
  @Input() hasIconClassHidden: boolean = false;
  @Input() isIconRight: boolean = false;
  @Input() iconClass: string = '';
  @Input() iconClassHidden: any;
  @Input() text: string = '';
  @Input() type: string = 'button';
  @Input() buttonClass: string =
    'w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-lg shadow-xs text-sm font-medium text-white bg-[#E91E63] hover:bg-[#D81B60] focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-[#E91E63] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';
  @Input() hasDisabledCondition: boolean = false;
  @Input() disabledCondition: any;
  @Output() onClick = new EventEmitter<void>();
}
