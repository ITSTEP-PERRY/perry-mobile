import { ImageSourcePropType } from 'react-native';

export interface ProductApiDto {
  id: string;
  name: string;             
  slug?: string;            
  price: string;            
  discountPrice?: number;   
  imageUrl?: string;        
  description?: string;    
  category?: string;
  rating?: number;
  reviewsCount?: number;
  isFavorite?: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: string;   
  image: ImageSourcePropType | { uri: string }; 
  slug?: string;
  description?: string;
  category?: string;
  rating?: number;
  reviews?: number;
  reviewsCount?: string | number;
  oldPrice?: string | number;
  discountBadge?: string;
  isFavorite?: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface ProductStats {
  viewsCount: number;
  salesCount: number;
  rating: number;
}

export interface ProductPartial {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export interface GetProductsParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  categoryId?: string;
}