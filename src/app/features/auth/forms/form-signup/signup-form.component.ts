import { Location } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { RecaptchaModule } from 'ng-recaptcha-2';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment.development';
import { IApiResponse } from '../../../../core/interfaces/api.response.interface';
import { AuthService } from '../../../../core/providers/auth.service';
import { FooterService } from '../../../../core/providers/footer.service';
import { NavbarService } from '../../../../core/providers/navbar.service';
import { ButtonControlComponent } from '../../../../shared/ui/button/button-control.component';
import { InputControlComponent } from '../../../../shared/ui/controls/input-control/input-control.component';
import { FormPasswordControlComponent } from '../../../../shared/ui/form-password-control/form-password-control.component';
import { FormPhoneControlComponent } from '../../../../shared/ui/form-phone-control/form-phone-control.component';
import { ImageControlComponent } from '../../../../shared/ui/image-control/image-control.component';

@Component({
  selector: 'signup-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonControlComponent,
    RecaptchaModule,
    FormPasswordControlComponent,
    InputControlComponent,
    FormPhoneControlComponent,
    ImageControlComponent,
  ],
  templateUrl: './signup-form.component.html',
})
export class SignupFormComponent {
  @Input() enable: boolean = true;

  registerForm: FormGroup;
  isLoading = signal<boolean>(false);
  SITE_KEY: string = environment.GOOGLE_API_URL;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toast: HotToastService,
    private readonly router: Router,
    private readonly location: Location,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly navbarService: NavbarService,
    private readonly footerService: FooterService,
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        captchaToken: ['', [Validators.required]],
      },
      { validators: this.passwordsMatch },
    );
  }

  ngOnInit(): void {
    this.navbarService.hide();
    this.footerService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.show();
    this.footerService.show();
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  goBack() {
    this.location.back();
  }

  onSubmit(): void {
    if (!this.registerForm.valid) {
      return;
    }

    const phoneNumber = '+52' + this.registerForm.get('phone')?.value;

    const user = this.registerForm.value;

    if (!this.enable) {
      return this.onSuccessTest();
    }

    this.authService
      .signUp({
        username: user.username,
        email: user.email,
        password: user.password,
        phone: phoneNumber.replace(/\s/g, ''),
      })
      .pipe(
        tap(() => this.isLoading.set(true)),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (response) => this.onSuccess(response),
        error: (error) => this.onError(error),
      });
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

  onSuccessTest(): void {
    this.onRedirect();
  }

  onSuccess(response: IApiResponse): void {
    this.toast.success(response.message, { position: 'top-right' });

    this.onRedirect();
  }

  onRedirect(): void {
    this.router.navigate(['/auth/login']);
  }

  resolved(captchaResponse: string | null) {
    this.registerForm.get('captchaToken')?.setValue(captchaResponse);
  }
}
