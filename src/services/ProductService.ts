import { apiClient } from '../api/axious'; 
import { Product, ProductApiDto, PaginatedResponse, ProductStats, ProductPartial, GetProductsParams, } from '../types/product';

const mapDtoToProduct = (dto: ProductApiDto): Product => ({
  id: dto.id,
  title: dto.name, 
  price: dto.price,
  oldPrice: dto.discountPrice,
  image: dto.imageUrl
    ? { uri: dto.imageUrl }
    : { uri: `${apiClient.defaults.baseURL}/api/Products/image/${dto.id}` },
  rating: dto.rating,
  reviewsCount: dto.reviewsCount,
  isFavorite: dto.isFavorite,
  slug: dto.slug,
  description: dto.description,
  category: dto.category,
});

export const productService = {

  getProducts: async (params?: GetProductsParams): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get<PaginatedResponse<ProductApiDto>>('/api/Products', { params });
    return {
      ...response.data,
      items: response.data.items.map(mapDtoToProduct),
    };
  },

  getPopularProducts: async (limit = 10): Promise<Product[]> => {
    const response = await apiClient.get<ProductApiDto[]>('/api/Products/popular', {
      params: { limit },
    });
    return response.data.map(mapDtoToProduct);
  },

  getProductById: async (id: string): Promise<Product> => {
    const response = await apiClient.get<ProductApiDto>(`/api/Products/${id}`);
    return mapDtoToProduct(response.data);
  },

  getProductBySlug: async (slug: string): Promise<Product> => {
    const response = await apiClient.get<ProductApiDto>(`/api/Products/by-slug/${slug}`);
    return mapDtoToProduct(response.data);
  },

  getProductImageUrl: (id: string): string => {
    return `${apiClient.defaults.baseURL}/api/Products/image/${id}`;
  },

  getProductStats: async (id: string): Promise<ProductStats> => {
    const response = await apiClient.get<ProductStats>(`/api/Products/${id}/stats`);
    return response.data;
  },

  getPartialProductById: async (id: string): Promise<ProductPartial> => {
    const response = await apiClient.get<ProductPartial>(`/api/Products/partial/${id}`);
    return response.data;
  },
};