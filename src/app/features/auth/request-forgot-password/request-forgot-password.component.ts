import { CommonModule } from '@angular/common';
import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AnimatedBackgroundComponent } from '../../../shared/animated-background/animated-background.component';
import { NavbarService } from '../../../core/providers/navbar.service';
import { FooterService } from '../../../core/providers/footer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SmsVerficationComponent } from "../sms-verification/sms-verification.component";
import { FormRequestForgotPasswordComponent } from "../forms/form-request-forgot-password/form-request-forgot-password.componen";
import { EmailVerificationComponent } from "../email-verification/email-verification.component";
import { ResetPasswordComponent } from "../reset-password/reset-password.component";

@Component({
  selector: 'request-forgot-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AnimatedBackgroundComponent,
    SmsVerficationComponent,
    FormRequestForgotPasswordComponent,
    EmailVerificationComponent,
    ResetPasswordComponent
],
  templateUrl: './request-forgot-password.component.html',
  styleUrl: './request-forgot-password.component.css',
})
export class RequestForgotPasswordComponent implements OnInit, OnDestroy {
  step = signal<'choose-method' | 'secret-question' | 'sms-verification' | 'email-verification' | 'reset-password'>('choose-method');

  token = signal<string | null>(null);

  constructor(
    private readonly navbarService: NavbarService,
    private readonly footerService: FooterService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.step.set(params['step'] || 'choose-method');
    });
        
  }

  ngOnInit(): void {
    this.navbarService.hide();
    this.footerService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.show();
    this.footerService.show();
  }

}
