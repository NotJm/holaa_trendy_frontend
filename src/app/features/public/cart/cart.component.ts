import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart } from '../../../core/interfaces/cart.interface';
import { CartService } from '../../../core/providers/cart.service';
import { CartItemComponent } from '../ui/cart-item/cart-item.component';
import { SaleService } from '../../../core/providers/sale.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { BeforeLoadingService } from '../../../core/providers/before-loading.service';
import { Platform } from '@angular/cdk/platform';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { finalize, Subscription, tap } from 'rxjs';
import { ButtonControlComponent } from "../../../shared/ui/button/button-control.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, CartItemComponent, ButtonControlComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  cart = signal<Cart | null>(null);
  isLoading = signal<boolean>(false);
  subTotal: number = 0.0;
  shippingCost: number = 40.0;

  private cartSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private readonly platform: Platform,
    private readonly toast: HotToastService,
    private readonly cartService: CartService,
    private readonly saleService: SaleService,
  ) {}

  ngOnInit(): void {
    if (!this.platform.isBrowser) return;

    this.fetchUserCart();
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  fetchUserCart() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }

    this.cartSubscription = this.cartService.getCart().subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.onError(error),
    });
  }

  onSuccess(response: IApiResponse): void {
    this.cart.set(response.data);
    this.calculateSubTotal();
  }

  onError(error: any): void {}

  calculateSubTotal() {
    if (
      !this.cart() ||
      !this.cart()?.cartItems ||
      this.cart()?.cartItems.length === 0
    ) {
      this.subTotal = 0.0;
      return;
    }

    this.subTotal =
      this.cart()?.cartItems.reduce((acc, cartItem) => {
        const priceString = String(cartItem.product.price).replace(
          /[^0-9.]/g,
          '',
        );
        const price = Number(priceString);

        const quantity = Number(cartItem.quantity);

        if (isNaN(price) || isNaN(quantity)) {
          return acc;
        }

        return acc + price * quantity;
      }, 0) || 0;
  }

  formatPrice(price: number): string {
    return price.toLocaleString('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  onIncreaseQuantity(productCode: string, quantity: number) {
    this.cartService
      .updateQuantityProductToCart({
        productCode: productCode,
        quantity: quantity + 1,
      })
      .subscribe({
        next: (response: IApiResponse) => this.onSuccess(response),
        error: (error: any) => this.onError(error),
      });
  }

  onDecreaseQuantity(productCode: string, quantity: number) {
    this.cartService
      .updateQuantityProductToCart({
        productCode: productCode,
        quantity: quantity - 1,
      })
      .subscribe({
        next: (response: IApiResponse) => this.onSuccess(response),
        error: (error: any) => this.onError(error),
      });
  }

  onDeleteProduct(productCode: string) {
    this.cartService.removeProductToCart(productCode).subscribe({
      next: (response: IApiResponse) => this.onSuccess(response),
      error: (error: any) => this.onError(error),
    });
  }

  onBuyProducts(): void {
    this.isLoading.set(true)
    this.saleService.add()
    .pipe(
      finalize(() => this.isLoading.set(false)))
    .subscribe({
      next: (response: IApiResponse) => this.onSuccess(response),
      error: (error: any) => this.onError(error),
    });
  }
}
