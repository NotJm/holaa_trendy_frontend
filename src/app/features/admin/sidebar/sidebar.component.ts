import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/providers/auth.service';
import { ImageControlComponent } from '../../../shared/ui/image-control/image-control.component';
import { UserService } from '../../../core/providers/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ImageControlComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  isCollapsed = false;

    /** A signal for handling the user's avatar */
    avatar = computed(() => this.userService.avatar());

    /** A signal for handling the user's username */
    username = computed(() => this.userService.username());
  
    /** A signal for handling the user's email */
    email = computed(() => this.userService.email());

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.authService.logOut().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
    });
  }

  ngOnInit(): void {
    this.initializeAuthState();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeAuthState(): void {
    this.authService
      .checkSession()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: IApiResponse) => {
          if (response.data.authenticate) {
            this.userService.getAvatar().subscribe()
          }
        },
        error: () => {
          this.router.navigate(['/auth/login']);
        },
      });
  }
}
