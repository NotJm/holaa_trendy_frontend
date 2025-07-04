import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IFeaturedProduct
} from '../../../../core/interfaces/product.interface';
import { ButtonControlComponent } from '../../../../shared/ui/button/button-control.component';
import { ImageControlComponent } from '../../../../shared/ui/image-control/image-control.component';

@Component({
  selector: 'product-card-featured',
  standalone: true,
  imports: [CommonModule, ButtonControlComponent, ImageControlComponent],
  templateUrl: './product-card-featured.component.html',
})
export class ProductCardFeaturedComponent {
  @Input() product!: IFeaturedProduct;
  @Input() isInWishlist: boolean = false;
  @Output() addToCartEvent = new EventEmitter<string>();
  @Output() onClickProduct = new EventEmitter<string>();
  @Output() addWishlistEvent = new EventEmitter<string>();

 
}
