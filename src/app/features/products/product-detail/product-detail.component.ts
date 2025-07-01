import { CommonModule } from '@angular/common';
import { Component, type OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { finalize } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { IProduct } from '../../../core/interfaces/products.interface';
import { ProductsService } from '../../../core/providers/api/products.service';
import { ImageControlComponent } from '../../../shared/ui/image-control/image-control.component';
import { FeaturedProductsComponent } from "../../public/featured-products/featured-products.component";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxImageZoomModule,
    ImageControlComponent,
    FeaturedProductsComponent
],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  sameProducts: IProduct[] = [];
  bestSellers: IProduct[] = [];
  bestOffers: IProduct[] = [];
  newArrivals: IProduct[] = [];

  product: IProduct | null = null;
  loading = signal<boolean>(false);
  error = signal<boolean>(false);

  productCode: string = '';
  selectedColor: string = '';
  selectedSize: string = '';
  selectedImage: number = 0;
  quantity: number = 1;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => this.handleParamsSuccess(params),
      error: () => this.error.set(true),
    });

    this.fetchBestSellers();
    this.fetchBestOffers();
    this.fetchNewArribals();
  }

  handleParamsSuccess(params: Params): void {
    this.productCode = params['code'];
    if (this.productCode) {
      this.fetchProductByCode(this.productCode);
    }
  }

  fetchProductByCode(code: string): void {
    this.productService
      .getProductByCode(code)
      .pipe(finalize(() => this.loading.set(true)))
      .subscribe({
        next: (response) => this.onSuccess(response),
        error: () => this.error.set(true),
        complete: () => this.loading.set(false)
      });
  }

  onSuccess(response: IApiResponse): void {
    this.product = response.data;

    this.fetchSameProducts();


    if (!this.product) {
      return this.error.set(true);
    }
    

    this.selectedColor = response.data.colorsNames[0] || '';
    this.selectedSize = response.data.sizesNames[0] || '';
  }

  setSelectedImage(index: number): void {
    this.selectedImage = index;
  }

  setSelectedColor(color: string): void {
    this.selectedColor = color;
  }

  setSelectedSize(size: string): void {
    this.selectedSize = size;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  addToCart(): void {
    if (!this.product) return;
  }

  addToWishlist(): void {
    if (!this.product) return;
  }

  calculateDiscountPercentage(): number {
    if (!this.product || !this.product.discount || this.product.discount === 0)
      return 0;
    return Math.round((this.product.discount / this.product.price) * 100);
  }

  isColorSelected(color: string): boolean {
    return this.selectedColor === color;
  }

  isSizeSelected(size: string): boolean {
    return this.selectedSize === size;
  }

  fetchSameProducts() {
    this.productService
      .getProductsByCategory(this.product?.categoryName || '')
      .subscribe((response: IApiResponse) => {
        this.sameProducts = response.data;
      });
  }

  fetchBestSellers() {
    this.productService
      .getProductsByView('best-sellers')
      .subscribe((bestSellers) => {
        this.bestSellers = bestSellers;
      });
  }

  fetchBestOffers() {
    this.productService
      .getProductsByView('best-offers')
      .subscribe((bestOffers) => {
        this.bestOffers = bestOffers;
      });
  }

  fetchNewArribals() {
    this.productService
      .getProductsByView('new-arrivals')
      .subscribe((newArrivals) => {
        this.newArrivals = newArrivals;
      });
  }
  
}
