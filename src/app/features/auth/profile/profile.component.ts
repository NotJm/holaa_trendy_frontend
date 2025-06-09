import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { finalize, Subject, tap } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { AuthService } from '../../../core/providers/api/auth.service';
import { UserService } from '../../../core/providers/api/user.service';
import { FooterService } from '../../../core/providers/footer.service';
import { NavbarService } from '../../../core/providers/navbar.service';
import { AnimatedBackgroundComponent } from '../../../shared/animated-background/animated-background.component';
import { ButtonControlComponent } from '../../../shared/ui/button/button-control.component';
import { InputControlComponent } from '../../../shared/ui/controls/input-control/input-control.component';
import { FormTextAreaControlComponent } from '../../../shared/ui/form-text-area-control/form-text-area-control.component';
import { ImageControlComponent } from '../../../shared/ui/image-control/image-control.component';

interface FormData {
  username: string;
  email: string;
  direccion: string;
  codigoPostal: string;
  estado: string;
  municipio: string;
  ciudad: string;
  colonia: string;
  descripcion: string;
}

interface Errors {
  [key: string]: string;
}

@Component({
  selector: 'app-profile-template',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ImageControlComponent,
    AnimatedBackgroundComponent,
    ButtonControlComponent,
    InputControlComponent,
    FormTextAreaControlComponent,
    RouterLink
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  isLoading = signal(false);
  errors = signal<Errors>({});
  activeTab = signal('address');
  private destroy$ = new Subject<void>();

  isFirstTime = signal(true);

  profileForm: FormGroup;

  /** A signal for handling the user's avatar */
  // avatar = computed(() => this.userService.avatar());

  /** A signal for handling the user's username */
  // username = computed(() => this.userService.username());

  /** A signal for handling the user's email */
  // email = computed(() => this.userService.email());

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toast: HotToastService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly navbarService: NavbarService,
    private readonly footerService: FooterService,
  ) {
    this.profileForm = this.fb.group({
      address: ['', [Validators.required]],
      postCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      state: ['', [Validators.required]],
      municipality: ['', [Validators.required]],
      town: ['', [Validators.required]],
      colony: ['', [Validators.required]],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.initializeAuthState();

    this.initializeAddress();

    this.navbarService.hide();
    this.footerService.hide();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.navbarService.show();
    this.footerService.show();
  }

  private initializeAddress(): void {
    this.userService.getAddress().subscribe({
      next: (response: IApiResponse) => {
        console.log(response.data);
        if (response.data && response.data.address !== '') {
          this.isFirstTime.set(false);
          this.profileForm.patchValue(response.data);
        }
      }
    })
  }

  private initializeAuthState(): void {
    // this.authService
    //   .checkSession()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (response: IApiResponse) => {
    //       if (response.data.authenticate) {
    //         this.userService.getAvatar().subscribe();
    //       }
    //     },
    //   });
    // this.userService.getAddress().subscribe({
    //   next: (response: IApiResponse) => {

    //   }
    // })
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  getInitials(): string {
    const username = this.profileForm.get('username')?.value || '';
    return username.substring(0, 2).toUpperCase();
  }

  clearError(fieldName: string): void {
    if (this.errors()[fieldName]) {
      const newErrors = { ...this.errors() };
      delete newErrors[fieldName];
      this.errors.set(newErrors);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.invalid) return;

    const { address, postCode, state, municipality, town, colony, description } = this.profileForm.value;

    this.userService.updateAddress(address, postCode, state, municipality, town, colony, description)
    .pipe(
      tap(() => this.isLoading.set(true)),
      finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: (response: IApiResponse) => this.onSuccess(response),
      error: (error: any) => this.onError(error)
    })

    
    
  }

  onSuccess(response: IApiResponse): void {
    this.toast.success('Datos actualizados correctamente');
    if (response.data)  {
      this.isFirstTime.set(false);
      this.profileForm.patchValue(response.data);
    }
  }

  onError(error: any): void {
    this.toast.error('Error al actualizar los datos');
  }
}
