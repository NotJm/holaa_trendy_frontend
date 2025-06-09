import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { finalize, tap } from 'rxjs';
import { IApiResponse } from '../../../../core/interfaces/api.response.interface';
import { AuthService } from '../../../../core/providers/api/auth.service';
import { ButtonControlComponent } from '../../../../shared/ui/button/button-control.component';
import { InputControlComponent } from '../../../../shared/ui/controls/input-control/input-control.component';

@Component({
  selector: 'form-email',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputControlComponent,
    ButtonControlComponent,
  ],
  templateUrl: './form-email.component.html',
})
export class FormEmailComponent {
  @Output() onNextStep = new EventEmitter<void>();

  emailForm: FormGroup;

  isLoading = signal<boolean>(false);

  constructor(
    private readonly fb: FormBuilder,
    private readonly toast: HotToastService,
    private readonly authService: AuthService,
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.emailForm.invalid) return;

    const email = this.emailForm.get('email')?.value;

    this.authService
      .sendRecoveryLink(email)
      .pipe(
        tap(() => this.isLoading.set(true)),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (response) => this.onSuccess(response),
        error: (error) => this.onError(error),
      });
  }

  onSuccess(response: IApiResponse): void {
    this.toast.success(response.message, { position: 'top-right' });
    this.onNextStep.emit();
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
