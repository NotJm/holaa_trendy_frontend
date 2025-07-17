import { CommonModule } from '@angular/common';
import { Component, Input, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import {
  getDefaultIProduct,
  IFeaturedProduct,
  IProduct,
  IVariant,
} from '../../../core/interfaces/product.interface';
import { AuthService } from '../../../core/providers/api/auth.service';
import { CartService } from '../../../core/providers/api/cart.service';
import { ProductService } from '../../../core/providers/api/products.service';
import { WishlistService } from '../../../core/providers/api/wishlist.service';
import { LoadingComponent } from '../../../shared/loading-view/loading-view.component';
import { ButtonControlComponent } from '../../../shared/ui/button/button-control.component';
import { NavigationLinkComponent } from '../../../shared/ui/navigation-link/navigation-link.component';
import { ModalProductVariant } from '../ui/modal-product-variant/modal-product-variant.component';
import { ProductCardFeaturedComponent } from '../ui/product-card-featured/product-card-featured.component';

@Component({
  selector: 'featured-products',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ButtonControlComponent,
    LoadingComponent,
    NavigationLinkComponent,
    ProductCardFeaturedComponent,
    ModalProductVariant,
  ],
  templateUrl: './featured-products.component.html',
})
export class FeaturedProductsComponent {
  @Input({ required: true }) featuredProducts!: IFeaturedProduct[];
  @Input({ required: true }) titleFeatured!: string;
  @Input({ required: true }) description!: string;

  stateModal = signal<boolean>(false);
  productSelected = signal<IProduct>(getDefaultIProduct());

  @ViewChild('owlCarousel', { static: false }) owlCarousel: any;

  carouselOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    rewind: true,

    navSpeed: 1000,
    smartSpeed: 1000,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      640: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1024: {
        items: 4,
      },
      1280: {
        items: 5,
      },
    },
    nav: false,
  };

  constructor(
    private readonly router: Router,
    private readonly toast: HotToastService,
    private readonly authService: AuthService,
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly wishlistService: WishlistService
  ) {}

  private fetchProductByCode(productCode: string): void {
    this.productService.getProductByCode(productCode).subscribe({
      next: (response: IApiResponse) => this.productSelected.set(response.data),
    });
  }

  next() {
    if (this.owlCarousel) {
      this.owlCarousel.next();
    }
  }

  prev() {
    if (this.owlCarousel) {
      this.owlCarousel.prev();
    }
  }

  redirectToProductDetail(productCode: string) {
    this.router.navigate(['/products/detail', productCode]);
  }

  onAddWishlist(productCode: string): void {
    this.authService.checkSession().subscribe((response) => {
      if (response.data.authenticate) {
        return this.wishlistService
          .addProduct(productCode)
          .subscribe((response) => {
            this.toast.success(response.message);
          });
      }
      return this.redirectToLogin();
    });
  }

  onAddToCart(productCode: string) {
    this.stateModal.set(true);
    this.fetchProductByCode(productCode);
  }

  public onAddToCartEvent(cart: {
    product: IProduct;
    variant: IVariant;
  }): void {
    console.log(cart);
    this.authService.checkSession().subscribe({
      next: (response: IApiResponse) => {
        if (response.data.authenticated) {
          return this.cartService
            .addProductToCart({
              productCode: cart.product.code,
              quantity: 1,
              sizeName: cart.variant.sizeName,
            })
            .subscribe({
              next: (response: IApiResponse) => {
                this.toast.success(response.message);
              },
            });
        }
        return this.redirectToLogin();
      },
    });
  }

  redirectToLogin() {
    this.router.navigate(['auth/login']);
  }
}
