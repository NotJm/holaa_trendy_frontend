import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ButtonControlComponent } from '../ui/button/button-control.component';
import { IconControlComponent } from '../ui/controls/icon-control/icon-control.component';

@Component({
  selector: 'success-view',
  standalone: true,
  imports: [CommonModule, IconControlComponent, ButtonControlComponent],
  template: `<div
    class="bg-white rounded-lg shadow-md p-8 relative max-w-md mx-auto"
  >
    <div class="flex justify-center mb-8">
      <icon-control
        iconClass="icon-[mdi--check] w-20 h-16 rounded-full bg-[#E91E63] flex items-center justify-center"
      />
    </div>

    <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center font-karla">
      {{ successTitle }}
    </h2>
    <div class="w-16 h-1 bg-[#E91E63] mx-auto mb-6"></div>

    <p class="text-gray-600 mb-8 max-w-xs mx-auto text-center font-karla">
      {{ successMessage }}
    </p>

    <button-control
      *ngIf="hasButton"
      buttonClass="w-full py-3 bg-[#E91E63] text-white rounded-md font-medium hover:bg-[#D81B60] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      [textButton]="this.hasCustomButtonText ? this.customButtonText : 'Boton de exito'"
      (onClick)="onClick.emit()"
    />
  </div>`,
})
export class SuccessViewComponent {
  @Input() successTitle: string = 'Titulo de exito';
  @Input() successMessage: string = 'Mensaje de exito';
  @Input() hasButton: boolean = true;
  @Input() hasCustomButtonText: boolean = false;
  @Input() customButtonText: string = 'Boton de exito';
  @Output() onClick = new EventEmitter<void>();


}
