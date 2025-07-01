import { CommonModule } from "@angular/common"
import { Component, EventEmitter, Input, Output } from "@angular/core"
import { RouterLink } from "@angular/router"
import { IProduct } from "../../../core/interfaces/products.interface"
import { WishListItem } from "../../../core/interfaces/wishlist.interface"

@Component({
  selector: "app-wishlist-item",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./wishlist-item.component.html",
})
export class WishlistItemComponent {
  @Input() item!: WishListItem
  @Output() removeItem = new EventEmitter<string>()
  @Output() addToCart = new EventEmitter<IProduct>()

  showOverlay = false

  onMouseEnter(): void {
    this.showOverlay = true
  }

  onMouseLeave(): void {
    this.showOverlay = false
  }

  remove(): void {
    this.removeItem.emit(this.item.product.code)
  }

  addProductToCart(): void {
    this.addToCart.emit(this.item.product)
  }

  formatDate(dateString: string): string {
    if (!dateString) return ""

    const date = new Date()
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }
}

