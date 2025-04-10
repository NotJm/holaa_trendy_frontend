export interface Product {
  code: string  ;
  name: string;
  imgUri: string;
  images: string[];
  description: string;
  price: number;
  discount: number;
  finalPrice: number;
  stock: number;
  categoryName: string;
  subCategoryName: string;
  colorsNames: string[];
  sizesNames: string[];
}



export type ProductsWithoutCode = Omit<Product, 'code'>;
