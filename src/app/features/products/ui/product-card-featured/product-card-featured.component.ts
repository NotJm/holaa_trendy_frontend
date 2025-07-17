import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { IFeaturedProduct } from '../../../../core/interfaces/product.interface';
import { ButtonControlComponent } from '../../../../shared/ui/button/button-control.component';
import { ImageControlComponent } from '../../../../shared/ui/controls/image-control/image-control.component';

@Component({
  selector: 'product-card-featured',
  standalone: true,
  imports: [CommonModule, ButtonControlComponent, ImageControlComponent],
  templateUrl: './product-card-featured.component.html',
  styleUrl: './product-card-featured.component.css',
})
export class ProductCardFeaturedComponent implements OnChanges {
  @Input() product!: IFeaturedProduct;
  @Input() isInWishlist: boolean = false;
  @Output() addToCartEvent = new EventEmitter<string>();
  @Output() onClickProduct = new EventEmitter<string>();
  @Output() addWishlistEvent = new EventEmitter<string>();

  isHovered = signal<boolean>(false);
  rotateInterval: any;
  currentImageSrc = '';
  currentImageIndex = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) this.currentImageSrc = this.product.imgUri;
  }

  public onMouseEnter(): void {
    this.isHovered.update((value) => !value);

    if (!this.hasHoverImage()) return;

    if (this.rotateInterval) clearInterval(this.rotateInterval);

    this.rotateInterval = setInterval(() => {
      this.rotateImages();
    }, 2000);
  }

  public onMouseLeave(): void {
    this.isHovered.update((value) => !value);

    if (this.rotateInterval) {
      clearInterval(this.rotateInterval);
      this.rotateInterval = null;
    }

    setTimeout(() => {
      this.currentImageIndex = -1;
      this.currentImageSrc = this.product.imgUri;
    }, 1000);
  }

  hasHoverImage(): boolean {
    return this.product.images && this.product.images.length > 0;
  }

  getHoverImage(): string {
    if (this.hasHoverImage()) {
      const otherImages = this.product.images.filter(
        (img) => img !== this.currentImageSrc
      );
      const randomIndex = Math.floor(Math.random() * otherImages.length);

      return otherImages[randomIndex];
    }
    return this.product.imgUri;
  }

  isCurrentImageIndex(index: number): boolean {
    return this.currentImageIndex === index;
  }

  getImageClasses(): string {
    const baseClasses =
      'w-full h-full object-cover transition-all duration-500 ease-in-out transform';
    const hoverClasses = this.isHovered()
      ? 'scale-105 brightness-105'
      : 'scale-100 brightness-100';

    return `${baseClasses} ${hoverClasses}`;
  }

  rotateImages() {
    if (!this.hasHoverImage() && !this.isHovered()) return;

    const nextIndex = (this.currentImageIndex + 1) % this.product.images.length;
    this.currentImageIndex = nextIndex;
    this.currentImageSrc = this.product.images[nextIndex];
  }
}
