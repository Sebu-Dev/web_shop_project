export interface ProductType {
  description: string;
  quantity?: number;
  id: number;
  name: string;
  image: string;
  price: number;
  onSale?: boolean;
}
