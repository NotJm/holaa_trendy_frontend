import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnpicImageDirective } from '@unpic/angular';
import { CartItem } from '../../../../core/interfaces/cart.interface';

@Component({
  selector: 'cart-item',
  standalone: true,
  imports: [CommonModule, UnpicImageDirective],
  template: `<div
    class="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
  >
    <div class="flex space-x-6">
      <!-- Checkbox -->
      <div class="flex items-start pt-2">
        <input
          type="checkbox"
          (change)="onToggle()"
          class="form-checkbox h-5 w-5 text-[#E91E63] rounded-full border-2 border-[#E0E0E0] focus:ring-[#E91E63] transition-all duration-200"
        />
      </div>

      <!-- Product Image -->
      <div class="relative w-32 h-40 group overflow-hidden rounded-lg">
        <img
          unpic
          [src]="cartItem.product.imgUri"
          [alt]="cartItem.product.name"
          class="w-full h-full object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-[#E91E63]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
      </div>

      <!-- Product Details -->
      <div class="flex-1 flex flex-col justify-between">
        <div class="flex justify-between items-start">
          <div>
            <h3
              class="font-cinzel font-semibold text-lg text-[#000000] mb-1 tracking-wide"
            >
              {{ cartItem.product.name }}
            </h3>
            <p class="text-sm text-gray-500 font-medium">
              Stock: {{ cartItem.product.stock }}
            </p>
          </div>
          <button
            (click)="onDelete()"
            class="text-gray-400 hover:text-[#E91E63] transition-colors duration-200"
            aria-label="Eliminar producto"
          >
            <span class="icon-[mdi--delete-outline] w-6 h-6"></span>
          </button>
        </div>

        <div class="flex justify-between items-end mt-6">
          <div class="flex items-center space-x-4">
            <!-- Quantity Controls -->
            <div
              class="flex items-center space-x-2 bg-gray-100 rounded-full p-1"
            >
              <button
                (click)="onDecrease()"
                [disabled]="cartItem.quantity <= 1"
                [class.opacity-50]="cartItem.quantity <= 1"
                class="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-[#E91E63] hover:bg-[#E91E63] hover:text-white transition-all duration-200"
                aria-label="Disminuir cantidad"
              >
                <span class="icon-[mdi--minus] w-4 h-4"></span>
              </button>
              <span class="w-10 text-center font-medium text-[#000000]">{{
                cartItem.quantity
              }}</span>
              <button
                (click)="onIncrease()"
                [disabled]="cartItem.quantity >= cartItem.product.stock"
                [class.opacity-50]="cartItem.quantity >= cartItem.product.stock"
                class="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-[#E91E63] hover:bg-[#E91E63] hover:text-white transition-all duration-200"
                aria-label="Aumentar cantidad"
              >
                <span class="icon-[mdi--plus] w-4 h-4"></span>
              </button>
            </div>

            <!-- Wishlist Button -->
            <button
              class="text-gray-400 hover:text-[#E91E63] transition-colors duration-200"
              aria-label="Añadir a favoritos"
            >
              <span class="icon-[mdi--heart-outline] w-6 h-6"></span>
            </button>
          </div>

          <span class="font-cinzel font-bold text-xl text-[#E91E63]">
            {{ cartItem.product.price }}
          </span>
        </div>
      </div>
    </div>
  </div> `,
})
export class CartItemComponent {
  @Input({ required: true }) cartItem!: CartItem;
  @Output() onIncreaseQuantity = new EventEmitter<string>();
  @Output() onDecreaseQuantity = new EventEmitter<string>();
  @Output() onDeleteProduct = new EventEmitter<string>();
  @Output() onToggleCartItem = new EventEmitter<string>();

  onDelete() {
    this.onDeleteProduct.emit(this.cartItem.product.code);
  }

  onIncrease() {
    if (this.cartItem.quantity < this.cartItem.product.stock) {
      this.onIncreaseQuantity.emit(this.cartItem.product.code);
    }
  }

  onDecrease() {
    if (this.cartItem.quantity > 1) {
      this.onDecreaseQuantity.emit(this.cartItem.product.code);
    }
  }

  onToggle() {
    this.onToggleCartItem.emit(this.cartItem.id);
  }
}
