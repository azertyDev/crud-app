export interface ICart {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

export interface IProduct {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  inCart?: boolean;
}
