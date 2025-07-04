import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges
} from '@angular/core';
import {
  getDefaultIVariant,
  IProduct,
  IVariant,
} from '../../../../core/interfaces/product.interface';

@Component({
  selector: 'modal-product-variant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-product-variant.component.html',
})
export class ModalProductVariant implements OnChanges {
  @Input({ required: true }) product!: IProduct;
  @Input() isOpen: boolean = false;

  @Output() onCloseModal = new EventEmitter<void>();
  @Output() onAddToCart = new EventEmitter<{
    product: IProduct;
    variant: IVariant;
  }>();
  @Output() onAddToWishlist = new EventEmitter<IProduct>();

  variantSelected = signal<IVariant>(getDefaultIVariant());
  currentImage = signal<string>("");

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['product']) {
      this.currentImage.set(this.product.imgUri)
      this.variantSelected.set(this.product.variants[0]);
      this.product.images.push(this.product.imgUri);
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  public onEscapeKey(event: KeyboardEvent): void {
    if (this.isOpen) this.closeModal();
  }

  public onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closeModal();
  }

  public closeModal(): void {
    this.variantSelected.set(getDefaultIVariant());
    this.onCloseModal.emit();
  }

  public onSelectVariant(variant: IVariant): void {
    if (variant.stock > 0) this.variantSelected.set(variant);
  }

  selectImage(image: string) {
    this.currentImage.set(image);
  }

  public getSizeButtonClass(variant: IVariant): string {
    const baseClasses =
      'relative p-4 border-2 rounded-xl transition-all duration-200 text-center min-h-[4.5rem] flex flex-col items-center justify-center hover:shadow-md';

    if (variant.stock === 0) {
      return `${baseClasses} border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed hover:shadow-none`;
    }

    if (this.variantSelected().sizeName === variant.sizeName) {
      return `${baseClasses} border-gray-900 bg-gray-900 text-white shadow-lg hover:shadow-xl`;
    }

    if (variant.stock <= 3) {
      return `${baseClasses} border-orange-200 hover:border-orange-400 hover:bg-orange-50 text-gray-700`;
    }

    return `${baseClasses} border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-gray-700`;
  }

  public getThumbnailClass(image: string): string {
    const baseClasses =
      'w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105';

    if (this.currentImage() === image) {
      return `${baseClasses} border-gray-900 shadow-lg`;
    }

    return `${baseClasses} border-gray-200 hover:border-gray-400`;
  }

  public getStockIndicatorClass(stock: number): string {
    if (stock === 0) return 'w-3 h-3 bg-red-400 rounded-full';
    if (stock <= 3) return 'w-3 h-3 bg-orange-400 rounded-full animate-pulse';
    return 'w-3 h-3 bg-green-400 rounded-full';
  }

  public getStockTextClass(stock: number): string {    
    if (stock === 0) return 'text-red-600';
    if (stock <= 3) return 'text-orange-600';
    return 'text-green-600';
  }

  public getStockMessage(stock: number): string {
    if (stock === 0) return 'Sin stock disponible';
    if (stock === 1) return '¡Última unidad disponible!';
    if (stock <= 3) return `Solo ${stock} unidades disponibles`;
    return `${stock} unidades en stock`;
  }

  
  trackByVariant(index: number, variant: IVariant): string {
    return variant.sizeName;
  }

  trackByImage(index: number, image: string): string {
    return image;
  }
}
