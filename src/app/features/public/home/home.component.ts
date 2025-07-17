import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IFeaturedProduct
} from '../../../core/interfaces/product.interface';
import { ProductService } from '../../../core/providers/api/products.service';
import { SliderCategoriesComponent } from '../../../shared/ui/slider/slider-categories.component';
import { FeaturedProductsComponent } from '../../products/featured-products/featured-products.component';
import { PromotionalBannerComponent } from '../ui/promotional-banner/promotional-banner.component';
import { ServiceFeaturesComponent } from '../ui/service-features/service-features.component';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
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
export class HomeComponent implements OnInit {
  bestSellers: IFeaturedProduct[] = [];
  bestOffers:  IFeaturedProduct[] = [];
  newArrivals: IFeaturedProduct[] = [];

  constructor(private readonly productsService: ProductService) {}

  ngOnInit(): void {
    this.fetchFeaturedProducts();
  }

  fetchBestSellers() {
    this.productsService
      .getProductsByFeatured('best-sellers')
      .subscribe({
        next: (response: IApiResponse) => this.bestSellers = response.data
      });
  }

  fetchBestOffers() {
    this.productsService
      .getProductsByFeatured('best-offers')
      .subscribe({
        next: (response: IApiResponse) => this.bestOffers = response.data
      });
  }

  fetchNewArribals() {
    this.productsService
      .getProductsByFeatured('new-arrivals')
      .subscribe({
        next: (response: IApiResponse) => this.newArrivals = response.data
      });
  }

  fetchFeaturedProducts() {
    this.fetchBestOffers();
    console.log(this.bestOffers);
    this.fetchBestSellers();
    this.fetchNewArribals();
  }
}
