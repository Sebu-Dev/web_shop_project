export interface ProductType {
  description: string;
  quantity?: number;
  id: string;
  name: string;
  image: string;
  price: number;
  onSale?: boolean;
}
