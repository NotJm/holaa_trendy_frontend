import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IconControlComponent } from '../icon-control/icon-control.component';

@Component({
  selector: 'input-control',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IconControlComponent,
  ],
  templateUrl: './input-control.component.html',
  styleUrl: './input-control.component.css',
})
export class InputControlComponent implements OnChanges {
  // Only properties if input is used form
  @Input({ required: true }) useFormControl!: boolean;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() inputValue: string = '';

  // Only properties for input control component
  @Input() hasLabel: boolean = false;
  @Input() labelClass: string = 'block text-sm font-medium text-gray-700';
  @Input() label?: string;
  @Input() inputType: string = 'text';
  @Input() inputClass: string =
    'w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:ring-[#E91E63] focus:border-[#E91E63] transition-colors duration-300';
  @Input() placeholder?: string = '';
  @Input() enableAutocomplete: 'username' | 'password' | 'off' = 'username';
  @Input() isReadOnly: boolean = false;
  @Input() value: string = ''

  // Only properties for error input
  @Input() errorClass: string = 'text-red-500 text-sm mt-1 animate-fade-in';
  @Input() errorMessage?: string;

  // Only optional properties for icon custom class
  @Input() hasIcon: boolean = false;
  @Input() iconClass: string = '';

  @Output() valueChange =  new EventEmitter<string>();
  @Output() onFocusEvent  =  new EventEmitter<void>();
  @Output() onBlurEvent   =  new EventEmitter<void>();

  iconClassComplete: string = '';

  ngOnChanges(changes: SimpleChanges): void {
   
  }

  onInputChange(newValue: string): void {
    this.value = newValue;
    this.valueChange.emit(this.value)
  }

  get control(): AbstractControl<any, any> | null {
    return this.formGroup?.get(this.controlName);
  }

  get isInvalid(): boolean | undefined {
    return this.control?.invalid && this.control?.touched;
  }

}
