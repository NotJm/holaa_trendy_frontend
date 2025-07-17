import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { delay, Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from '../../../core/providers/api/auth.service';
import { UserService } from '../../../core/providers/api/user.service';
import { NavigationLinkComponent } from '../../../shared/ui/navigation-link/navigation-link.component';
import { IUserWithAvatar } from '../../../core/interfaces/users.interface';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { ButtonControlComponent } from '../../../shared/ui/button/button-control.component';
import { ImageControlComponent } from '../../../shared/ui/controls/image-control/image-control.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ImageControlComponent,
    NavigationLinkComponent,
    ButtonControlComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit, OnDestroy {
  #destroy$ = new Subject<void>();

  userAvatar: string = 'https://avatar.iran.liara.run/public/34';
  userName: string = 'Admin';
  userEmail: string = 'user@example.com';

  isLoading = signal<boolean>(false);


  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  private getUserData(): void {
    const cachedUser = this.userService.getCachedUser();

    if (cachedUser) {
      this.setUserData(cachedUser);
    }

    this.userService
      .getUserData()
      .pipe(takeUntil(this.#destroy$))
      .subscribe({
        next: (response: IApiResponse) => this.setUserData(response.data),
      });
  }

  private setUserData(userData: IUserWithAvatar): void {
    this.userAvatar = userData.avatar ?? '';
    this.userEmail = userData.email ?? '';
    this.userName = userData.username ?? '';
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  logout(): void {
    this.authService
      .logOut()
      .pipe(
        takeUntil(this.#destroy$),
        tap(() => this.isLoading.set(true)),
        delay(2000)
      )
      .subscribe({
        next: () => this.router.navigate(['/auth/login']),
        error: () => this.router.navigate(['/auth/login']),
        complete: () => this.isLoading.set(false)
      });
  }
}
