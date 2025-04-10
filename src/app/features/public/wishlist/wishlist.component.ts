import { Component, Input, type OnInit, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"
import { WishlistItemComponent } from "../wishlist-item/wishlist-item.component"
import { WishList, WishListItem } from "../../../core/interfaces/wishlist.interface"
import { Product } from "../../../core/interfaces/products.interface"
import { WishlistService } from '../../../core/providers/wishlist.service';

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

  addToCart(product: Product): void {
    // Implementación de añadir al carrito
    console.log("Añadido al carrito:", product)
  }

  fetchWishlist(): any {
    this.wishlistService.getWishList().subscribe((response) => {
      console.log(response);
      this.wishlist = response.data.wishList
    })
  }

  // Datos de ejemplo
  private getMockWishlistItems(): WishListItem[] {
    return [
      {
        product: {
          code: "VS001",
          name: "Vestido Floral de Verano",
          imgUri: "/placeholder.svg?height=400&width=300",
          images: ["/placeholder.svg?height=400&width=300", "/placeholder.svg?height=400&width=300"],
          description:
            "Hermoso vestido floral perfecto para el verano. Confeccionado con tela ligera y transpirable que te mantendrá fresca en los días calurosos.",
          price: 129.99,
          discount: 30,
          finalPrice: 89.99,
          stock: 10,
          categoryName: "Vestidos",
          subCategoryName: "Casual",
          colorsNames: ["Rosa", "Blanco", "Floral"],
          sizesNames: ["XS", "S", "M", "L"],
        },
      },
      {
        product: {
          code: "BL002",
          name: "Blusa de Seda",
          imgUri: "/placeholder.svg?height=400&width=300",
          images: ["/placeholder.svg?height=400&width=300", "/placeholder.svg?height=400&width=300"],
          description:
            "Elegante blusa de seda con un acabado suave y lujoso. Perfecta para ocasiones formales o para elevar tu look diario.",
          price: 65.5,
          discount: 0,
          finalPrice: 65.5,
          stock: 5,
          categoryName: "Blusas",
          subCategoryName: "Formal",
          colorsNames: ["Negro", "Blanco", "Beige"],
          sizesNames: ["S", "M", "L"],
        },
      },
      {
        product: {
          code: "JN003",
          name: "Jeans de Cintura Alta",
          imgUri: "/placeholder.svg?height=400&width=300",
          images: ["/placeholder.svg?height=400&width=300", "/placeholder.svg?height=400&width=300"],
          description:
            "Jeans de cintura alta con un ajuste perfecto que estiliza tu figura. Confeccionados con denim de alta calidad para mayor durabilidad.",
          price: 95.0,
          discount: 21,
          finalPrice: 75.0,
          stock: 8,
          categoryName: "Pantalones",
          subCategoryName: "Jeans",
          colorsNames: ["Azul Oscuro", "Negro", "Azul Claro"],
          sizesNames: ["26", "27", "28", "29", "30"],
        },
      },
      {
        product: {
          code: "CK004",
          name: "Chaqueta de Cuero",
          imgUri: "/placeholder.svg?height=400&width=300",
          images: ["/placeholder.svg?height=400&width=300", "/placeholder.svg?height=400&width=300"],
          description:
            "Chaqueta de cuero genuino con un diseño clásico y atemporal. Perfecta para añadir un toque de rebeldía a cualquier conjunto.",
          price: 199.99,
          discount: 0,
          finalPrice: 199.99,
          stock: 0,
          categoryName: "Chaquetas",
          subCategoryName: "Cuero",
          colorsNames: ["Negro", "Marrón"],
          sizesNames: ["S", "M", "L", "XL"],
        },
      },
    ]
  }
}

