import { IProduct } from "./product.interface";

export interface ICart {
  userName: string;
  items: ICartItem[];
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
  sizeName: string;
  stock: number;
}

export interface IAddProductToCart {
  productCode: string;
  sizeName: string;
  quantity: number;
}

export interface IUpdateProductToCart extends IAddProductToCart {}
