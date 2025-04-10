import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../core/interfaces/products.interface';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'control-search-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './control-search-products.component.html',
  animations: [trigger('slideInOut', [
    transition(':enter', [
      style({ transform: 'translateY(-10%)', opacity: 0 }),
      animate(
        '200ms ease-out',
        style({ transform: 'translateY(0)', opacity: 1 }),
      ),
    ]),
    transition(':leave', [
      animate(
        '200ms ease-in',
        style({ transform: 'translateY(-10%)', opacity: 0 }),
      ),
    ]),
  ])],
})
export class ControlSearchProductsComponent {
  @Input({ required: true }) showResults: boolean = false;
  @Input({ required: true }) products: Product[] = [];
  @Output() onSearchForm = new EventEmitter<string>();
  @Output() onFocusForm = new EventEmitter<string>();
  @Output() onBlurForm = new EventEmitter<string>();

  constructor(private readonly router: Router) {}

  keyword: string = '';
  isSearching = false

  onSearch() {
    this.isSearching = false;
    this.onSearchForm.emit(this.keyword);
  }

  onFocus() {
    if (this.products.length > 0) {
      this.showResults = true;
    }
  }

  onBlur() {
    setTimeout(() => {
      this.showResults = false
    }, 200)
  }

  onHover(product: Product) {
    // Add pulse animation to hovered product
    const productElement = event?.currentTarget as HTMLElement;
    productElement.classList.add('pulse');
    // setTimeout(() => productElement.classList.remove("pulse"), 500)
  }

  onLeave() {}

  onProductClick(product: Product) {
    this.keyword = '';
    this.router.navigate(['products/detail', product.code]);
  }
}
