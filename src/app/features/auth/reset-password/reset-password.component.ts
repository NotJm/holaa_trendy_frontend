import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { finalize, tap } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { AuthService } from '../../../core/providers/api/auth.service';
import { FooterService } from '../../../core/providers/footer.service';
import { NavbarService } from '../../../core/providers/navbar.service';
import { ButtonControlComponent } from '../../../shared/ui/button/button-control.component';
import { FormPasswordControlComponent } from '../../../shared/ui/form-password-control/form-password-control.component';

@Component({
  selector: 'reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormPasswordControlComponent,
    ButtonControlComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  resetForm: FormGroup;
  newShowPassword: boolean = false;
  confirmShowPassword: boolean = false;
  isLoading = signal<boolean>(false);
  requirements = {
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toast: HotToastService,
    private readonly authService: AuthService,
    private readonly navbarService: NavbarService,
    private readonly footerService: FooterService,
  ) {
    this.resetForm = this.fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatch },
    );
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    return group.get('newPassword')?.value ===
      group.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  ngOnInit(): void {
    this.navbarService.hide();
    this.footerService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.show();
    this.footerService.show();
  }

  onSubmit(): void {
    if (this.resetForm.invalid) return;

    if (this.resetForm.valid) {
      const newPassword = this.resetForm.value.newPassword;

      this.authService
        .resetPassword(newPassword)
        .pipe(
          tap(() => this.isLoading.set(true)),
          finalize(() => this.isLoading.set(false)),
        )
        .subscribe({
          next: (response: IApiResponse) => this.onSuccess(response),
          error: (error: any) => this.onError(error),
        });
    }
  }

  onSuccess(response: IApiResponse): void {
    this.toast.success('Se ha cambiado con exito la contraseña', {
      position: 'top-right',
    });

    setTimeout(() => {
      this.router.navigate(['auth/login'], { replaceUrl: true });
    }, 3000);
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
