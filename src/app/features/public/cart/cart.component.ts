import { Platform } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { finalize, Subscription } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api.response.interface';
import { ICart } from '../../../core/interfaces/cart.interface';
import { CartService } from '../../../core/providers/api/cart.service';
import { SaleService } from '../../../core/providers/api/sale.service';
import { CartItemComponent } from '../ui/cart-item/cart-item.component';
import { ButtonControlComponent } from "../../../shared/ui/button/button-control.component";

declare var paypal: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CartItemComponent,
    ButtonControlComponent
],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  cart = signal<ICart | null>(null);
  isLoading = signal<boolean>(false);
  subTotal: number = 0.0;
  shippingCost: number = 0.0;

  private cartSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private readonly platform: Platform,
    private readonly toast: HotToastService,
    private readonly cartService: CartService,
    private readonly saleService: SaleService
  ) {}

  // HOOKS //

  ngOnInit(): void {
    if (!this.platform.isBrowser) return;

    this.fetchUserCart();
    this.fetchPaypalScript().then(() => this.initPayPalButton());
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  // FETCH DATA OR SCRIPTS

  fetchUserCart() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }

    this.cartSubscription = this.cartService.getCart().subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.onError(error),
    });
  }

  fetchPaypalScript(): Promise<void> {
    return new Promise((resolve) => {
      if (document.getElementById('paypal-sdk')) {
        return resolve();
      }

      const script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src =
        'https://www.paypal.com/sdk/js?client-id=AVMJhMs9w-d_a_nemkhCko1HiG51rEFfveqj2uFGArMtPDH1kezxKzgU_5-JWLUN81PJXph6Ngu7m5Jw&currency=MXN&components=buttons,hosted-fields&enable-funding=card';
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }

  // INITIALIZED //

  initPayPalButton(): void {
    const amount = this.subTotal.toFixed(2);

    if (paypal) {
      paypal
        .Buttons({
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'pill',
            label: 'paypal',
          },
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: 'MXN',
                    value: amount,
                  },
                },
              ],
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              this.toast.success(
                'Pago completado por: ' + details.payer.name.given_name
              );
              this.onBuy();
            });
          },
          onError: (err: any) => {
            console.error('Error en el pago:', err);
            this.toast.error('Hubo un problema al procesar el pago.');
          },
        })
        .render('#paypal-button-container');
    }
  }

  // EVENTS //

  onSuccess(response: IApiResponse): void {
    this.cart.set(response.data); 
    console.log(this.cart());
    this.calculateSubTotal();
  }

  onError(error: any): void {}

  calculateSubTotal(): void {
    if (
      !this.cart() ||
      !this.cart()?.items ||
      this.cart()?.items.length === 0
    ) {
      this.subTotal = 0.0;
      return;
    }

    this.subTotal =
      this.cart()?.items.reduce((acc, cartItem) => {
        const priceString = String(cartItem.product.price).replace(
          /[^0-9.]/g,
          ''
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

  onIncreaseQuantity(productCode: string, quantity: number, sizeName: string) {
    this.cartService
      .updateQuantityProductToCart({
        productCode: productCode,
        quantity: quantity + 1,
        sizeName: sizeName
      })
      .subscribe({
        next: (response: IApiResponse) => this.onSuccess(response),
        error: (error: any) => this.onError(error),
      });
  }

  onDecreaseQuantity(productCode: string, quantity: number, sizeName: string) {
    this.cartService
      .updateQuantityProductToCart({
        productCode: productCode,
        quantity: quantity - 1,
        sizeName: sizeName
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

  onBuy(): void {
    this.isLoading.set(true);
    this.saleService
      .add()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response: IApiResponse) => {
          this.onSuccess(response)  
          this.toast.success('Compra registrada correctamente.');
        },
        error: (error: any) => this.onError(error),
      });
  }
}
