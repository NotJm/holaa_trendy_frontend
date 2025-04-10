import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'input-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input-control.component.html',
  styleUrl: './input-control.component.css',
})
export class InputControlComponent implements OnInit {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) iconClass!: string;
  @Input({ required: true }) placeholder!: string;
  @Input() errorMessage!: string;

  @Input() type: string = 'text';
  @Input() autocomplete: 'username' | 'password' | 'off' = 'username';
  @Input() isReadOnly: boolean = true;
  @Input() useFormControl: boolean = true;

  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() inputValue!: string;

  @Output() valueChange = new EventEmitter<string>();

  ngOnInit(): void {
    if (!this.useFormControl) return;

    if (!this.form) {
      throw new Error(
        'El FormGroup es obligatorio cuando useFormControl es true.',
      );
    }
    if (!this.controlName) {
      throw new Error(
        'El controlName es obligatorio cuando useFormControl es true.',
      );
    }
  }

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
