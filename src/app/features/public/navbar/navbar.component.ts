import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  distinctUntilChanged,
  filter,
  finalize,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { AuthService } from '../../../core/providers/api/auth.service';
import { UserService } from '../../../core/providers/api/user.service';
import { NavbarService } from '../../../core/providers/navbar.service';
import { IconControlComponent } from '../../../shared/ui/controls/icon-control/icon-control.component';
import { NavigationLinkComponent } from '../../../shared/ui/navigation-link/navigation-link.component';
import { SearchComponent } from '../ui/search/search.component';
import { TopSocialBarComponent } from '../ui/top-social-bar/top-social-bar.component';
import { ButtonControlComponent } from '../../../shared/ui/button/button-control.component';
import { IUserWithAvatar } from '../../../core/interfaces/users.interface';
import { ImageControlComponent } from '../../../shared/ui/controls/image-control/image-control.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TopSocialBarComponent,
    NavigationLinkComponent,
    ImageControlComponent,
    IconControlComponent,
    SearchComponent,
    ButtonControlComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isOpen = signal<boolean>(false);
  isDropdownOpen = signal<boolean>(false);

  isAuthenticated = signal<boolean>(false);
  isAdmin = signal<boolean>(false);
  isEmployee = signal<boolean>(false);

  userAvatar: string = '';
  userName: string = '';
  userEmail: string = '';

  /** A signal for handling the logic to show/hidden the navbar */
  isVisible = computed(() => this.navbarService.visible());

  /** A subject for destroying the components */
  #destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.checkIsAdmin();
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  private checkIsAdmin(): void {
    this.authService.adminState
      .pipe(takeUntil(this.#destroy$))
      .subscribe((isAdmin) => this.isAdmin.set(isAdmin));
  }

  private checkIsEmployee(): void {
    this.authService.employeeState
      .pipe(takeUntil(this.#destroy$))
      .subscribe((isEmployee) => this.isEmployee.set(isEmployee));
  }

  private checkAuthentication(): void {
    this.authService.authState
      .pipe(
        takeUntil(this.#destroy$),
        distinctUntilChanged(),
        switchMap((isAuthenticated) =>
          this.handleAuthenticated(isAuthenticated)
        )
      )
      .subscribe();
  }

  private handleAuthenticated(
    authSate: boolean
  ): Observable<IApiResponse | void> {
    this.isAuthenticated.set(authSate);

    if (authSate) {
      return this.loadUserData();
    }

    return this.authService.checkSession().pipe(
      filter((response) => response.data.authenticated),
      tap((response) => {
        this.isAuthenticated.set(response.data.authenticated);

        this.isAdmin.set(response.data.role === 'admin');

        this.isEmployee.set(response.data.role === 'employee');
      }),
      switchMap(() => this.loadUserData())
    );
  }

  private loadUserData(): Observable<IApiResponse | void> {
    const cachedUser = this.userService.getCachedUser();

    if (cachedUser) {
      this.setUserData(cachedUser);
      return new Observable<void>((observer) => observer.complete());
    }

    return this.userService
      .getUserData()
      .pipe(tap((response: IApiResponse) => this.setUserData(response.data)));
  }

  private setUserData(user: IUserWithAvatar): void {
    this.userName = user?.username ?? '';
    this.userEmail = user?.email ?? '';
    this.userAvatar = user?.avatar ?? '';
  }

  toggleDropdown() {
    this.isDropdownOpen.update((value) => !value);
  }

  toggleMenu() {
    this.isOpen.update((value) => !value);
  }

  onClose() {
    this.isOpen.set(false);
    this.isDropdownOpen.set(false);
  }

  viewProfile() {
    this.onClose();
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService
      .logOut()
      .pipe(
        takeUntil(this.#destroy$),
        finalize(() => this.onClose()),
        tap(() => this.isAuthenticated.set(false))
      )
      .subscribe({
        next: () => this.router.navigate(['/auth/login']),
        error: () => this.router.navigate(['/auth/login']),
      });
  }
}
