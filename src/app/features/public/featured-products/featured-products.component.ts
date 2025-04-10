import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../../../core/interfaces/products.interface';
import { AuthService } from '../../../core/providers/auth.service';
import { CartService } from '../../../core/providers/cart.service';
import { WishlistService } from '../../../core/providers/wishlist.service';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { ButtonControlComponent } from '../../../shared/ui/button/button-control.component';
import { NavigationLinkComponent } from '../../../shared/ui/navigation-link/navigation-link.component';
import { ProductCardComponent } from '../../products/ui/product-card/product-card.component';

@Component({
  selector: 'featured-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    CarouselModule,
    ButtonControlComponent,
    LoadingComponent,
    NavigationLinkComponent,
  ],
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css'],
})
export class FeaturedProductsComponent {
  @Input({ required: true }) titleP!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) products!: Product[];
  @Input() invert?: boolean = false;

  @ViewChild('owlCarousel', { static: false }) owlCarousel: any;

  constructor(
    private readonly router: Router,
    private readonly toast: HotToastService,
    private readonly authService: AuthService,
    private readonly cartService: CartService,
    private readonly wishlistService: WishlistService,
  ) {}

  carouselOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    rewind: true,
    navSpeed: 1000,
    smartSpeed: 1000,
    autoplay: true,
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
    },
    nav: false,
  };

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

  onAddToCartEvent(productCode: string) {
    this.authService.checkSession().subscribe((response) => {
      if (response.data.authenticate) {
        return this.cartService
          .addProductToCart({ productCode: productCode, quantity: 1 })
          .subscribe((response) => {
            this.toast.success(response.message);
          });
      }
      return this.redirectToLogin();
    });
  }

  redirectToLogin() {
    this.router.navigate(['auth/login']);
  }
}
