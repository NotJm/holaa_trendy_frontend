import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IProduct
} from '../../../../core/interfaces/product.interface';
import { ButtonControlComponent } from '../../../../shared/ui/button/button-control.component';
import { ImageControlComponent } from '../../../../shared/ui/controls/image-control/image-control.component';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CommonModule, ButtonControlComponent, ImageControlComponent],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent  {
  @Input() product!: IProduct;
  @Input() isInWishlist: boolean = false;
  @Output() addToCartEvent = new EventEmitter<string>();
  @Output() onClickProduct = new EventEmitter<string>();
  @Output() addWishlistEvent = new EventEmitter<string>();
 
}
