export interface Product {
  id: string | number;
  title: string;
  price: string | number;
  image: string; 
  isNew?: boolean;
  discount?: string;
}