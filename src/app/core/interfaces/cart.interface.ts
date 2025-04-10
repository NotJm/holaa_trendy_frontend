import { Product } from "./products.interface";

export interface Cart {
  id: string;
  cartItems: CartItem[];
  isActive: boolean;
};

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface AddProduct {
  productCode: string;
  quantity: number;
}

export type UpdateQuantity = AddProduct;
