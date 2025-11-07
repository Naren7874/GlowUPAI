import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { ShoppingBag, Star } from 'lucide-react-native';
import { styles } from './common/styles';

const recommendedProducts = [
  {
    id: 1,
    name: 'Minimalist Niacinamide Serum',
    brand: 'Minimalist',
    price: '₹599',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Cetaphil Gentle Cleanser',
    brand: 'Cetaphil',
    price: '₹749',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'La Roche-Posay Sunscreen',
    brand: 'La Roche-Posay',
    price: '₹1,299',
    rating: 4.8,
  }
];

export default function ProductRecommendations() {
  return (
    <View style={styles.productsSection}>
      <Text style={styles.sectionTitle}>Recommended Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
        {recommendedProducts.map((product) => (
          <TouchableOpacity key={product.id} style={styles.productCard}>
            <BlurView intensity={15} style={styles.productBlur}>
              <View style={styles.productImagePlaceholder}>
                <ShoppingBag size={24} color="#EC4899" />
              </View>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productBrand}>{product.brand}</Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>{product.price}</Text>
                <View style={styles.productRating}>
                  <Star size={12} color="#FBBF24" fill="#FBBF24" />
                  <Text style={styles.ratingText}>{product.rating}</Text>
                </View>
              </View>
            </BlurView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}