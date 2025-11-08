import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IFeaturedProduct } from '../../../core/interfaces/product.interface';
import { ProductService } from '../../../core/providers/api/products.service';
import { SliderCategoriesComponent } from '../../../shared/ui/slider/slider-categories.component';
import { FeaturedProductsComponent } from '../../products/featured-products/featured-products.component';
import { PromotionalBannerComponent } from '../ui/promotional-banner/promotional-banner.component';
import { ServiceFeaturesComponent } from '../ui/service-features/service-features.component';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { RecommendationService } from '../../../core/providers/api/recommendation.service';
import {
  distinctUntilChanged,
  filter,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AuthService } from '../../../core/providers/api/auth.service';
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    PromotionalBannerComponent,
    ServiceFeaturesComponent,
    SliderCategoriesComponent,
    FeaturedProductsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  #destroy$ = new Subject<void>();

  bestSellers: IFeaturedProduct[] = [];
  bestOffers: IFeaturedProduct[] = [];
  newArrivals: IFeaturedProduct[] = [];
  recommendations = signal<IFeaturedProduct[]>([]);
  productBoughtName = signal<string>('');

  isAuthenticated = signal<boolean>(false);

  constructor(
    private readonly productsService: ProductService,
    private readonly authService: AuthService,
    private readonly recommendationService: RecommendationService
  ) {}

  ngOnInit(): void {
    this.fetchBestOffers();

    this.fetchBestSellers();

    this.fetchNewArribals();

    this.checkAuthentication();

    setTimeout(() => {
      if (this.isAuthenticated()) {
        this.fetchRecommendationProducts();
      }
    }, 500);
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  fetchBestSellers() {
    this.productsService.getProductsByFeatured('best-sellers').subscribe({
      next: (response: IApiResponse) => (this.bestSellers = response.data),
    });
  }

  fetchBestOffers() {
    this.productsService.getProductsByFeatured('best-offers').subscribe({
      next: (response: IApiResponse) => (this.bestOffers = response.data),
    });
  }

  fetchNewArribals() {
    this.productsService.getProductsByFeatured('new-arrivals').subscribe({
      next: (response: IApiResponse) => (this.newArrivals = response.data),
    });
  }

  private fetchRecommendationProducts(): void {
    this.recommendationService
      .getRecommendationProducts()
      .pipe(takeUntil(this.#destroy$))
      .subscribe({
        next: (response: IApiResponse) => {
          this.recommendations.set(response.data.products);
          this.productBoughtName.set(response.data.productName);
        },
      });
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

    return this.authService.checkSession().pipe(
      filter((response) => response.data.authenticated),
      tap((response) => {
        this.isAuthenticated.set(response.data.authenticated);
      })
    );
  }
}
