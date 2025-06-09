import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { CookieService } from 'ngx-cookie-service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { finalize } from 'rxjs/operators';
import { IApiResponse } from '../../../../core/interfaces/api.response.interface';
import { AuthService } from '../../../../core/providers/api/auth.service';
import { ButtonControlComponent } from '../../../../shared/ui/button/button-control.component';
import { InputControlComponent } from '../../../../shared/ui/controls/input-control/input-control.component';
import { FormPasswordControlComponent } from '../../../../shared/ui/form-password-control/form-password-control.component';
import { ImageControlComponent } from '../../../../shared/ui/image-control/image-control.component';
import { NavigationLinkComponent } from '../../../../shared/ui/navigation-link/navigation-link.component';

interface CarouselSlide {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
}

@Component({
  selector: 'form-login',
  standalone: true,
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
  imports: [
    ButtonControlComponent,
    FormPasswordControlComponent,
    NavigationLinkComponent,
    InputControlComponent,
    ReactiveFormsModule,
    ImageControlComponent,
    CarouselModule,
    CommonModule,
  ],
})
export class FormLoginComponent {
  @Output() onNextStep = new EventEmitter<void>();

  loginForm: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;
  isBrowser: boolean = false;

  // Configuración del carrusel
  carouselOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    rewind: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    smartSpeed: 1000,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    items: 1,
    nav: false,
  };

  carouselSlides: CarouselSlide[] = [
    {
      imageSrc:
        'https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk10/Tops-CE-wk10-2x3.jpg?imwidth=1536',
      alt: 'Imagen de moda 1',
      title: 'Bienvenida a HOLAA Trendy',
      description: 'Descubre las últimas tendencias en moda',
    },
    {
      imageSrc:
        'https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk10/Linen-CE-Wk10-2x3.jpg?imwidth=1536',
      alt: 'Imagen de moda 2',
      title: 'Estilo y Elegancia',
      description: 'Encuentra tu estilo único con nosotros',
    },
    {
      imageSrc:
        'https://image.hm.com/content/dam/global_campaigns/season_01/women/startpage-assets/wk10/Dresses-CE-Wk10-2x3.jpg?imwidth=1536g',
      alt: 'Imagen de moda 3',
      title: 'Moda Exclusiva',
      description: 'Las mejores marcas a tu alcance',
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly toast: HotToastService,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials = this.loginForm.value;

      this.authService
        .logIn(credentials)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: () => this.onSuccess(),
          error: (error: any) => this.onError(error),
        });
    }
  }

  goBack() {
    this.location.back();
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  private onSuccess(): void {
    this.onNextStep.emit();
  }

  private onError(error: any): void {
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

  redirectToForgotPassword(): void {
    this.router.navigate(['auth/request-forgot-password']);
  }
}
