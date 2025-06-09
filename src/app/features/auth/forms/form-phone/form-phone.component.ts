import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { finalize, tap } from 'rxjs';
import { IApiResponse } from '../../../../core/interfaces/api.response.interface';
import { AuthService } from '../../../../core/providers/api/auth.service';
import { ButtonControlComponent } from '../../../../shared/ui/button/button-control.component';
import { IconControlComponent } from '../../../../shared/ui/controls/icon-control/icon-control.component';
import { FormPhoneControlComponent } from '../../../../shared/ui/form-phone-control/form-phone-control.component';
@Component({
  selector: 'form-phone',
  templateUrl: './form-phone.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ButtonControlComponent,
    IconControlComponent,
    FormPhoneControlComponent,
    ReactiveFormsModule,
  ],
})
export class FormPhoneComponent {
  @Input() enable: boolean = true;

  @Output() onNextStep = new EventEmitter<'otp'>();
  @Output() onPreviousStep = new EventEmitter<void>();
  @Output() phoneNumber = new EventEmitter<string>();

  isLoading = signal<boolean>(false);

  phoneForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toast: HotToastService,
    private readonly authService: AuthService,
  ) {
    this.phoneForm = this.fb.group({
      phoneNumber: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.phoneForm.invalid) return;

    const phoneNumberWithSpaces =
      '+52 ' + this.phoneForm.get('phoneNumber')?.value;

    const phone = phoneNumberWithSpaces.replace(/\s+/g, '').trim();

    if (!this.enable) {
      return this.onSuccess(undefined, phone);
    }

    this.authService
      .sendVerificationCode(phone)
      .pipe(
        tap(() => this.isLoading.set(true)),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (response: IApiResponse) => this.onSuccess(response, phone),
        error: (error: any) => this.onError(error),
      });
  }

  onSuccess(response?: IApiResponse, phone?: string): void {
    if (response) {
      this.toast.success(response?.message);
    }
    this.onNextStep.emit('otp');
    this.phoneNumber.emit(phone);
  }

  onError(error: any): void {
    this.toast.error(error.message, {
      position: 'top-right',
      duration: 5000,
      dismissible: true,
      theme: 'toast',
      className: 'holaa-error-toast',
      style: {
        border: 'none',
        borderRadius: '0.5rem',
        background: 'linear-gradient(135deg, #000000, #1a1a1a)',
        color: '#ffffff',
        boxShadow:
          '0 10px 15px -3px rgba(233, 30, 99, 0.3), 0 4px 6px -4px rgba(233, 30, 99, 0.4)',
        padding: '1rem 1.25rem',
        fontWeight: '500',
        borderLeft: '4px solid #E91E63',
      },
      iconTheme: {
        primary: '#E91E63',
        secondary: '#ffffff',
      },
      ariaLive: 'assertive',
    });
  }
}
