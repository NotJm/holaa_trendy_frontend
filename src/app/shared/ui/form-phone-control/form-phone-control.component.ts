import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneFormatDirective } from './directives/phone-format.directive';

@Component({
  selector: 'form-phone-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PhoneFormatDirective],
  template: `<div class="space-y-2" [formGroup]="form">
    <label
      for="phone"
      class="block font-popins text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <div class="mt-1 relative">
      <!-- Country Prefix with Flag -->
      <div
        class="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none"
      >
        <div class="flex items-center space-x-1">
          <img
            src="https://flagcdn.com/w20/mx.png"
            alt="Bandera de México"
            class="w-5 h-auto rounded-xs shadow-xs"
          />
          <span class="text-gray-700 font-medium">+52</span>
        </div>
      </div>

      <input
        id="phone"
        type="tel"
        phoneFormat
        [formControlName]="controlName"
        placeholder="123 456 789 0"
        class="w-full pl-[4.5rem] pr-3 py-3 border-2 border-gray-200 rounded-lg focus:ring-[#E91E63] focus:border-[#E91E63] transition-colors duration-300 font-popins"
        [class.border-red-300]="
          form.get(controlName)?.invalid && form.get(controlName)?.touched
        "
      />
    </div>

    <!-- Error Messages -->
    <div
      *ngIf="form.get(controlName)?.invalid && form.get(controlName)?.touched"
      class="text-red-500 text-left text-sm mt-1 font-popins animate-fade-in"
    >
      <p *ngIf="form.get(controlName)?.errors?.['required']">
        El número de teléfono es requerido
      </p>
      <p *ngIf="form.get(controlName)?.errors?.['pattern']">
        Ingresa un número de teléfono válido (10 dígitos)
      </p>
    </div>
  </div>`,
  styles: `:host {
    display: block;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }`,
})
export class FormPhoneControlComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;
  @Input() type = 'text';

  @Output() valueChange = new EventEmitter<string>();

  get control() {
    return this.form?.get(this.controlName);
  }

  get isInvalid() {
    return this.control?.invalid && this.control?.touched;
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
}
