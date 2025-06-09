import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { IconControlComponent } from "../controls/icon-control/icon-control.component";

@Component({
  selector: 'button-control',
  standalone: true,
  imports: [CommonModule, IconControlComponent],
  templateUrl: './button-control.component.html',
})
export class ButtonControlComponent {
  // Only properties for the button control component
  @Input() textButton: string = '';
  @Input() typeButton: string = 'button';
  @Input() buttonClass: string =
    'w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent rounded-lg shadow-xs text-sm font-medium text-white bg-[#E91E63] hover:bg-[#D81B60] focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-[#E91E63] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

  // Disable button properties 
  @Input() hasDisabledCondition: boolean = false;
  @Input() disabledCondition: any;

  // Only properties for the icon button control component
  @Input() hasIcon: boolean = false;
  @Input() iconClass: string = '';

  // Disable button properties
  @Input() hasIconClassHidden: boolean = false;
  @Input() iconClassHidden: any;

  // Other icon properties
  @Input() isIconRight: boolean = false;

  // Only events output for the button control component
  @Output() onClick = new EventEmitter<void>();
}
