import { Product } from "./products.interface";

export interface WishList {
  id: string;
  wishListItems: WishListItem[]
}

export interface WishListItem {
  product: Product
}