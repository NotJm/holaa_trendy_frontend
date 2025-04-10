import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form-text-area-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: ` <div [formGroup]="form" class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="relative">
      <textarea
        formControlName="{{ controlName }}"
        class="w-full h-32 pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:ring-[#E91E63] focus:border-[#E91E63] transition-colors duration-300 flex items-center"
        [class.border-red-300]="isInvalid"
        [placeholder]="placeholder"
        (input)="onInputChange($event)"
      ></textarea>
      <span
        class="absolute top-4 left-3 text-gray-500 text-lg"
        [ngClass]="iconClass"
      ></span>
    </div>
    <div *ngIf="isInvalid" class="text-red-500 text-sm mt-1 animate-fade-in">
      {{ errorMessage }}
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
export class FormTextAreaControlComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) iconClass!: string;
  @Input({ required: true }) errorMessage!: string;
  @Input({ required: true }) placeholder!: string;

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
