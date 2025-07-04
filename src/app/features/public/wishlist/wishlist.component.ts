import { CommonModule } from "@angular/common"
import { Component, Input, type OnInit, signal } from "@angular/core"
import { RouterLink } from "@angular/router"
import { IProduct } from "../../../core/interfaces/product.interface"
import { WishList } from "../../../core/interfaces/wishlist.interface"
import { WishlistService } from '../../../core/providers/api/wishlist.service'
import { WishlistItemComponent } from "../wishlist-item/wishlist-item.component"

@Component({
  selector: "app-wishlist",
  standalone: true,
  imports: [CommonModule, RouterLink, WishlistItemComponent ],
  templateUrl: "./wishlist.component.html",
})
export class WishlistComponent implements OnInit {
  @Input() wishlistId = ""

  constructor(private readonly wishlistService: WishlistService) {}

  wishlist: WishList | null = null
  loading = signal<boolean>(true)

  ngOnInit(): void {
    // Simulación de carga de datos
    setTimeout(() => {
      this.fetchWishlist()
      this.loading.update(() => false)
    }, 500)
  }

  removeFromWishlist(productCode: string): void {
    // if (!this.wishlist()) return

    // this.wishlist.update((current) => {
    //   if (!current) return current
    //   return {
    //     ...current,
    //     item: current.item.filter((item) => item.product.code !== productCode),
    //   }
    // })
  }

  addToCart(product: IProduct): void {
    // Implementación de añadir al carrito
    console.log("Añadido al carrito:", product)
  }

  fetchWishlist(): any {
    this.wishlistService.getWishList().subscribe((response) => {
      console.log(response);
      this.wishlist = response.data.wishList
    })
  }

}

