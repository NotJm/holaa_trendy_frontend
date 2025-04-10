export interface IStockDepletionTime {
  id?: string;
  categoryName: string;
  stockInit: number;
  salesMarch: number;
  salesApril: number;
  stockOut: number;
}

export interface ISaleByCategory {
  categoryName: string;
  productCode: string;
  productName: string;
  productImage: string;
  stockInitial: number;
  registerSale: Date;
  saleQuantity: number;
}