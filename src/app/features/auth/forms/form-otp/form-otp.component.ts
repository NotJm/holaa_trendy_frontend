import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { finalize, tap } from 'rxjs';
import { IApiResponse } from '../../../../core/interfaces/api.response.interface';
import { AuthService } from '../../../../core/providers/api/auth.service';
import { ButtonControlComponent } from '../../../../shared/ui/button/button-control.component';
import { IconControlComponent } from '../../../../shared/ui/controls/icon-control/icon-control.component';
import { FormOtpControlComponent } from '../../../../shared/ui/form-otp-control/form-otp-control.component';

@Component({
  selector: 'form-otp',
  standalone: true,
  imports: [
    CommonModule,
    IconControlComponent,
    ReactiveFormsModule,
    ButtonControlComponent,
    FormOtpControlComponent,
    CountdownComponent,
  ],
  templateUrl: './form-otp.component.html',
})
export class FormOtpComponent {
  @Input() phone!: string;
  @Input() mode: 'login' | 'reset-password' = 'reset-password';
  @Input() enable: boolean = true;
  @Output() onNextStep = new EventEmitter<'success'>();
  @Output() onPreviousStep = new EventEmitter<void>();

  isLoading = signal<boolean>(false);
  canResend = signal<boolean>(false);

  otpForm: FormGroup;

  coutdownConfig = {
    leftTime: 30,
    format: 'ss',
    prettyText: (text: string) => text,
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly toast: HotToastService,
    private readonly authService: AuthService,
  ) {
    this.otpForm = this.fb.group({
      digit0: ['', Validators.required],
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
    });
  }

  get otpValue(): string {
    return Object.keys(this.otpForm.controls)
      .map((key) => this.otpForm.get(key)?.value)
      .join('');
  }

  onSubmit(): void {
    if (this.otpForm.invalid) return;

    const code = this.otpValue;

    if (!this.enable) {
      return this.onSuccess();
    }

    this.authService
      .verifyVerificationCode(this.phone, code)
      .pipe(
        tap(() => this.isLoading.set(true)),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (response: IApiResponse) => this.onSuccess(response),
        error: (error: any) => this.onError(error),
      });
  }

  onSuccess(response?: IApiResponse): void {
    if (response) {
      this.toast.success(response?.message);
    }
    this.onNextStep.emit('success');
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

  onResend(): void {}

  onFinish(event: CountdownEvent): void {
    if (event.action === 'done') {
      this.canResend.set(true);
    }
  }
}
