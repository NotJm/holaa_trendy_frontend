import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/providers/api/auth.service';
import { FooterService } from '../../../core/providers/footer.service';
import { NavbarService } from '../../../core/providers/navbar.service';
import { AnimatedBackgroundComponent } from '../../../shared/animated-background/animated-background.component';
import { SuccessViewComponent } from '../../../shared/success-view/success-view.component';
import { FormLoginComponent } from '../forms/form-login/form-login.component';
import { UserService } from '../../../core/providers/api/user.service';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CarouselModule,
    FormLoginComponent,
    AnimatedBackgroundComponent,
    SuccessViewComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  step = signal<'login' | 'pending' | 'success'>('login');
  token = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  tokenVerification: boolean = false;

  accountVerificationSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private readonly router: Router,
    private readonly navbarService: NavbarService,
    private readonly footerService: FooterService,
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.step.set(params['step'] || 'login');
      this.token.set(params['token'] || null);
    });

    if (this.accountVerificationSubscription) {
      this.accountVerificationSubscription.unsubscribe();
    }

    if (this.tokenVerification) {
      const token = this.token();

      if (token) {
        this.accountVerificationSubscription = this.authService.accountVerification(token).subscribe({
          next: (response: IApiResponse | null) => this.onSuccess(response),
        })
      }
    }

    this.navbarService.hide();
    this.footerService.hide();
  }

  ngOnDestroy(): void {
    this.navbarService.show();
    this.footerService.show();
  }

  onSuccess(response?: IApiResponse | null): void {
    this.authService.updateAuthState(true);
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigate(['/'], { replaceUrl: true });
    }, 3000);
  }
}
