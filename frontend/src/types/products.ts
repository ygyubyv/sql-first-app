export interface IProductListItem {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  stock: number;
  sku: string | null;
  isActive: boolean;
  category: string | null;
  brand: string | null;
  createdAt: string;
}

export interface IProductWithQuantity extends IProductListItem {
  quantity: number;
}

export interface IProduct extends IProductListItem {
  description: string | null;
  updatedAt: string;
}

export interface ICreateProduct {
  title: string;
  imageUrl: string;
  sku: string | null;

  price: number;
  stock: number;

  category: string | null;
  brand: string | null;
  description: string | null;

  isActive: boolean;
}

export interface IUpdateProduct {
  title: string;
  imageUrl: string;
  sku: string | null;

  price: number;
  stock: number;

  category: string | null;
  brand: string | null;

  isActive: boolean;
  description: string | null;
}
