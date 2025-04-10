import { CommonModule } from '@angular/common';
import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { FooterService } from '../../../core/providers/footer.service';
import { NavbarService } from '../../../core/providers/navbar.service';
import { AnimatedBackgroundComponent } from '../../../shared/animated-background/animated-background.component';
import { SignupFormComponent } from '../forms/form-signup/signup-form.component';
import { SuccessViewComponent } from "../../../shared/success-view/success-view.component";
import { AuthService } from '../../../core/providers/auth.service';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AnimatedBackgroundComponent,
    SignupFormComponent,
    SuccessViewComponent
],
  templateUrl: './signup.component.html',
  providers: [CookieService],
})
export class SignupComponent implements OnInit, OnDestroy {
  step = signal<'signup' | 'success'>('signup');
  token = signal<string | null>(null);

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly navbarService: NavbarService,
    private readonly footerService: FooterService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.step.set(params['step'] || 'signup')
      this.token.set(params['token'] || null)
    });

    effect(() => {
      if (this.token()) {
        const token = this.token() || '';

        this.authService.acoountActivation(token).subscribe()
      }
    })



  }

  ngOnInit(): void {
    this.navbarService.hide();
    this.footerService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.show();
    this.footerService.show();
  }

  onRedirect(): void {
    this.router.navigate(['/auth/login']);
  }
}
