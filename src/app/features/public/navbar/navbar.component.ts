import { CommonModule } from '@angular/common';
import { Component, computed, effect, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { catchError, of, Subject, switchMap, takeUntil } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { Product } from '../../../core/interfaces/products.interface';
import { AuthService } from '../../../core/providers/auth.service';
import { CartService } from '../../../core/providers/cart.service';
import { NavbarService } from '../../../core/providers/navbar.service';
import { ProductsService } from '../../../core/providers/products.service';
import { UserService } from '../../../core/providers/user.service';
import { IconLinkControlComponent } from '../../../shared/ui/icon-link-control/icon-link-control.component';
import { ImageControlComponent } from '../../../shared/ui/image-control/image-control.component';
import { NavigationLinkComponent } from '../../../shared/ui/navigation-link/navigation-link.component';
import { ControlSearchProductsComponent } from '../ui/control-search-products/control-search-products.component';
import { TopSocialBarComponent } from '../ui/top-social-bar/top-social-bar.component';
import { ModalService } from '../../../core/providers/modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TopSocialBarComponent,
    NavigationLinkComponent,
    ControlSearchProductsComponent,
    IconLinkControlComponent,
    ImageControlComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  /** A subject for search keywords */
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  products: Product[] = [];

  totalResults: number = 0;

  isLoading: boolean = false;
  isOpen: boolean = false;
  showResults: boolean = false;
  isDropdownOpen: boolean = false;
  role: string = '';

  /** A signal for handling the logic to show/hidden the navbar */
  isVisible = computed(() => this.navbarService.visible());

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly modalService: ModalService,
    private readonly navbarService: NavbarService,
    private readonly productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.displaySearchProducts();
  }

 

  displaySearchProducts() {
    this.searchSubject
      .pipe(
        switchMap((keyword) => {
          if (!keyword) {
            this.products = [];
            return of([]);
          }

          this.isLoading = true;

          return this.productsService.searchProducts(keyword).pipe(
            catchError(() => {
              this.isLoading = false;
              return of([]);
            }),
          );
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((products) => {
        this.products = products;
        this.showResults = true;
        this.totalResults = products.length;
        this.isLoading = false;
      });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSearch(keyword: string) {
    this.searchSubject.next(keyword.trim());
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
    this.isDropdownOpen = false;
  }

  viewProfile() {
    this.closeMenu();
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authService
      .logOut()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
          this.closeMenu();
        },
        error: () => {
          this.router.navigate(['/auth/login']);
          this.closeMenu();
        },
      });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  viewProfileModal() {
    this.modalService.show();
  }
}
