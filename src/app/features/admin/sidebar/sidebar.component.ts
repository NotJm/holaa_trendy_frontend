import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ImageControlComponent } from '../../../shared/ui/controls/image-control/image-control.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../core/providers/sidebar.service';
import { NavigationLinkComponent } from "../../../shared/ui/navigation-link/navigation-link.component";
import { UserService } from '../../../core/providers/api/user.service';
import { delay, Subject, takeUntil, tap } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { IUserWithAvatar } from '../../../core/interfaces/users.interface';
import { AuthService } from '../../../core/providers/api/auth.service';
import { Router } from '@angular/router';
import { ButtonControlComponent } from "../../../shared/ui/button/button-control.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [ImageControlComponent, CommonModule, ButtonControlComponent, NavigationLinkComponent],
})
export class SidebarComponent implements OnInit, OnDestroy {
  #destroy$ = new Subject<void>()

  isCollapsed = signal(false);
  isMobile = signal(false);
  isLoading = signal(false);

  userAvatar: string = '';
  userName: string = '';
  userEmail: string = '';


  constructor(
    public readonly sidebarService: SidebarService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.fetchUserData();
  }

  public ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  private fetchUserData(): void {
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



  public logout(): void {
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


