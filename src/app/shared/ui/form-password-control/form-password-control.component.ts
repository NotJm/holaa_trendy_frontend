import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form-password-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './form-password-control.component.html',
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
export class FormPasswordControlComponent implements OnInit {
  showPassword: boolean = false;
  showRequirements: boolean = false;
  requirements = {
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  };

  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) errorMessage!: string;
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) enableRequirements: boolean = false;

  ngOnInit() {
    this.form.get(this.controlName)?.valueChanges.subscribe(() => {
      this.checkPasswordStrength();
    });
  }

  toggle(): void {
    this.showPassword = !this.showPassword;
  }

  get control() {
    return this.form?.get(this.controlName);
  }

  get isInvalid() {
    return this.control?.invalid && this.control?.touched;
  }

  checkPasswordStrength() {
    const password = this.form.get(this.controlName)?.value;

    this.requirements = {
      length: password.length >= 8 && password.length <= 20,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
    };
  }
}
