import { IProduct } from "./products.interface";

export interface WishList {
  id: string;
  wishListItems: WishListItem[]
}

export interface WishListItem {
  product: IProduct
}