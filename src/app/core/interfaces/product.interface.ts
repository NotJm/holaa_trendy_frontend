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

export type IFeaturedProduct = Omit<IProduct, 'color' | 'variants'> & {
  colorName: string;
  sizeNames: string[];
};

export type IRanking = Pick<IProduct, 'name'> & {
  nSales: number
}

export type ILowStockProduct = Pick<
  IProduct,
  'name' | 'categoryName' | 'subCategoriesNames'
> & { totalStock: number };

export interface IVariant {
  sizeName: string;
  stock: number;
  isNew?: boolean;
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
    sizeName: '',
    stock: 0,
  };
};
