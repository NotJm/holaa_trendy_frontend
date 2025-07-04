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
      .subscribe((bestSellers) => this.bestSellers = bestSellers);
  }

  fetchBestOffers() {
    this.productsService
      .getProductsByFeatured('best-offers')
      .subscribe((bestOffers) => {
        this.bestOffers = bestOffers;
      });
  }

  fetchNewArribals() {
    this.productsService
      .getProductsByFeatured('new-arrivals')
      .subscribe((newArrivals) => {
        this.newArrivals = newArrivals;
      });
  }

  fetchFeaturedProducts() {
    this.fetchBestOffers();
    this.fetchBestSellers();
    this.fetchNewArribals();
  }
}
