import { IColor } from './color.interface';

export interface IProduct {
  code: string;
  name: string;
  imgUri: string;
  images: string[];
  description: string;
  price: number;
  discount: number;
  finalPrice: number;
  categoryName: string;
  subCategoriesNames: string[];
  color: IColor;
  variants: IVariant[];
}

export interface IFeaturedProduct {
  code: string;
  name: string;
  imgUri: string;
  description: string;
  price: number;
  discount: number;
  finalPrice: number;
  categoryName: string;
  subCategoriesNames: string[];
  colorName: string;
  sizeNames: string[];
}

export interface IVariant {
  sizeName: string;
  stock: number;
}

export type ProductsWithoutCode = Omit<IProduct, 'code'>;

export const getDefaultIProduct = (): IProduct => {
  return {
    code: '',
    name: '',
    imgUri: '',
    images: [],
    description: '',
    price: 0,
    discount: 0,
    finalPrice: 0,
    categoryName: '',
    subCategoriesNames: [],
    color: {
      name: '',
      hexCode: '',
    },
    variants: [],
  };
};

export const getDefaultIVariant = (): IVariant => {
  return {
    sizeName: "",
    stock: 0
  }
}
