import { IProduct } from "./product.interface";

export interface WishList {
  id: string;
  wishListItems: WishListItem[]
}

export interface WishListItem {
  product: IProduct
}