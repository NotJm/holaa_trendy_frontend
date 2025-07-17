import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconControlComponent } from "../icon-control/icon-control.component";

@Component({
  selector: 'textarea-control',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconControlComponent],
  templateUrl: './textarea-control.component.html',
  styleUrl: './textarea-control.component.css'
})
export class TextAreaControlComponent {
  @Input() useFormGroup: boolean = false;
  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() errorMessage!: string;
  
  @Input() label: string = '';
  @Input() labelClass: string = '';
  @Input() iconClass: string = '';
  @Input() textAreaClass: string = '';
  
  @Input() placeholder!: string;
  @Input() nRows: number = 4;

  @Input() value: any;

  @Output() valueChange = new EventEmitter<any>();

  get control() {
    return this.form?.get(this.controlName);
  }

  get isInvalid() {
    return this.control?.invalid && this.control?.touched;
  }

  onInputChange(newValue: string) {
    this.valueChange.emit(newValue);
  }
}
