import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Product } from '../types/Product';

const reviewIcon = `<svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9004 15.4702H28.1004" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.9004 21.5103H28.1004" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M35 13.79C35 10.46 32.3 7.77002 28.98 7.77002H11.02C7.69 7.77002 5 10.47 5 13.79V23.19C5 26.52 7.7 29.21 11.02 29.21H25.07C26.06 29.21 27.03 29.41 27.94 29.81L33.31 32.14C34.11 32.49 35 31.9 35 31.03V19.69" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const starIcon = `<svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.8301 34.0101C11.4601 35.0001 9.63011 33.6701 10.1501 32.0601L12.3601 25.2401C12.6701 24.2801 12.3301 23.2301 11.5101 22.6401L5.71011 18.4301C4.34011 17.4401 5.05011 15.2801 6.73011 15.2801H13.9001C14.9101 15.2801 15.8001 14.6301 16.1101 13.6701L18.3201 6.85008C18.8401 5.24008 21.1101 5.24008 21.6401 6.85008L23.8501 13.6701C24.1601 14.6301 25.0601 15.2801 26.0601 15.2801H33.2301C34.9201 15.2801 35.6201 17.4401 34.2501 18.4301L28.4501 22.6401C27.6301 23.2301 27.2901 24.2801 27.6001 25.2401L29.8101 32.0601C30.3301 33.6701 28.4901 35.0001 27.1301 34.0101L21.7001 29.6601C20.8801 29.0001 19.7201 28.9801 18.8701 29.5901L12.8001 34.0101H12.8301Z" fill="#0E2042" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const discountBadgeXml = `<svg width="65" height="40" viewBox="0 0 115 78" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_4071_6059)">
<path d="M8.09598 35.2001C8.06657 34.9562 8.05187 34.7122 8.03716 34.4683C7.09617 18.7944 24.2252 9.63097 36.6345 6.2004C50.4553 2.38866 66.0993 3.37971 78.8762 10.3476C96.4757 19.9532 104.68 40.1859 106.959 59.7477C107.503 64.459 102.533 67.6914 98.7252 65.0537C91.8883 60.3423 85.2573 51.5906 76.8325 49.9592C66.7609 48.0076 57.1452 52.7646 47.5588 55.6615C32.944 60.0679 9.83093 53.8624 8.09598 35.2001Z" fill="#B8EA48"/>
</g>
</svg>`;

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const [priceMain, priceSup] = product.price.split('.');
  const isDiscounted = Boolean(product.discountBadge || product.oldPrice);

  return (
    <TouchableOpacity
      style={[
        styles.productCard,
        isDiscounted && styles.discountedProductCard,
      ]}
      activeOpacity={0.8}
      onPress={() => onPress && onPress(product)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={
            typeof product.image === 'string'
              ? { uri: product.image }
              : product.image
          }
          style={styles.productImage}
          resizeMode="cover"
        />
        {product.discountBadge && (
          <View style={styles.discountBadgeWrapper}>
            <SvgXml xml={discountBadgeXml} width="60" height="36" />
            <Text style={styles.discountBadgeText}>
              {product.discountBadge}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.productTitle} numberOfLines={2}>
        {product.title}
      </Text>

      <View style={styles.ratingRow}>
        <View style={styles.iconMetaItem}>
          <SvgXml xml={starIcon} width="16" height="16" />
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>
        <View style={styles.iconMetaItem}>
          <SvgXml xml={reviewIcon} width="16" height="16" />
          <Text style={styles.reviewsText}>{product.reviewsCount}</Text>
        </View>
      </View>

      <View style={styles.priceRow}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceMain}>{priceMain}</Text>
          {priceSup && <Text style={styles.priceSup}>.{priceSup}</Text>}
        </View>
        {product.oldPrice && (
          <Text style={styles.oldPriceText}>{product.oldPrice}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: 225,
    height: 361,
    backgroundColor: '#F4FAFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    // Drop shadow
    shadowColor: '#2050AD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 11.5,
    elevation: 4,
  },
  discountedProductCard: {
    borderWidth: 2,
    borderColor: '#CCDDFF',
  },
  imageContainer: {
    position: 'relative',
    width: 160,
    height: 160,
    overflow: 'visible',
  },
  productImage: {
    width: 160,
    height: 160,
    borderRadius: 4,
  },
  discountBadgeWrapper: {
    position: 'absolute',
    top: -5,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadgeText: {
    position: 'absolute',
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: 11,
    color: '#0E2042',
  },
  productTitle: {
    fontFamily: 'Mulish',
    fontSize: 14,
    lineHeight: 18,
    color: '#0E2042',
    textAlign: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  iconMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: 'Mulish',
    fontSize: 12,
    color: '#0E2042',
  },
  reviewsText: {
    fontFamily: 'Mulish',
    fontSize: 12,
    color: '#0E2042',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  priceMain: {
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: 18,
    color: '#0E2042',
    lineHeight: 22,
  },
  priceSup: {
    fontFamily: 'Mulish',
    fontWeight: '700',
    fontSize: 11,
    color: '#0E2042',
    lineHeight: 14,
  },
  oldPriceText: {
    fontFamily: 'Mulish',
    fontSize: 13,
    color: 'rgba(14, 32, 66, 0.5)',
    textDecorationLine: 'line-through',
  },
});