import { ImageSourcePropType } from 'react-native';

export interface Product {
  id: string;
  title: string;
  price: string;
  image: ImageSourcePropType;
  rating?: number;
  reviews?: number;
  reviewsCount?: string;
  oldPrice?: string;
  discountBadge?: string;
  isFavorite?: boolean;
}