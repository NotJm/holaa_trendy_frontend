import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';
import { Product } from '../../../core/interfaces/products.interface';
import { ProductsService } from '../../../core/providers/api/products.service';
import { FeaturedProductsComponent } from '../featured-products/featured-products.component';
import { PromotionalBannerComponent } from '../ui/promotional-banner/promotional-banner.component';
import { ServiceFeaturesComponent } from '../ui/service-features/service-features.component';
import { SliderCategoriesComponent } from '../../../shared/ui/slider/slider-categories.component';
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
  bestSellers: Product[] = [];
  bestOffers: Product[] = [];
  newArrivals: Product[] = [];

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.displayFeaturedProducts();
  }

  fetchBestSellers() {
    this.productsService
      .getProductsByView('best-sellers')
      .subscribe((bestSellers) => {
        this.bestSellers = bestSellers;
      });
  }

  fetchBestOffers() {
    this.productsService
      .getProductsByView('best-offers')
      .subscribe((bestOffers) => {
        this.bestOffers = bestOffers;
      });
  }

  fetchNewArribals() {
    this.productsService
      .getProductsByView('new-arrivals')
      .subscribe((newArrivals) => {
        this.newArrivals = newArrivals;
      });
  }

  displayFeaturedProducts() {
    this.fetchBestOffers();
    this.fetchBestSellers();
    this.fetchNewArribals();
  }
}
