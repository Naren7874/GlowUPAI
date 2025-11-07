import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, ActivityIndicator, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { Sun, Moon, Calendar, ArrowLeft, RotateCcw, ExternalLink, ShoppingBag } from 'lucide-react-native';
import { PersonalizedRoutine, getProductRecommendations, ProductSuggestion } from '@/api/geminiService';
import { styles } from './common/styles';

interface PersonalizedRoutineDisplayProps {
  routine: PersonalizedRoutine;
  skinType: string;
  concerns: string[];
  onBack: () => void;
  onReset: () => void;
}

export default function PersonalizedRoutineDisplay({ 
  routine, 
  skinType, 
  concerns, 
  onBack, 
  onReset 
}: PersonalizedRoutineDisplayProps) {
  const [activeTab, setActiveTab] = useState<'morning' | 'evening' | 'weekly'>('morning');
  const [productSuggestions, setProductSuggestions] = useState<ProductSuggestion[]>([]);
  const [selectedProductType, setSelectedProductType] = useState<string>('');
  const [loadingProducts, setLoadingProducts] = useState<string>('');
  const [loadingRoutine, setLoadingRoutine] = useState(false);

  const handleGetProductSuggestions = async (productType: string) => {
    try {
      setLoadingProducts(productType);
      setSelectedProductType(productType);
      
      console.log(`🔄 Fetching ${productType} recommendations...`);
      const products = await getProductRecommendations(skinType, concerns, productType, 'medium');
      
      setProductSuggestions(products);
      console.log(`✅ Loaded ${products.length} ${productType} recommendations`);
    } catch (error) {
      console.error('❌ Error fetching product suggestions:', error);
      Alert.alert(
        'Unable to Load Products',
        error instanceof Error ? error.message : 'Failed to load product recommendations. Please try again.'
      );
    } finally {
      setLoadingProducts('');
    }
  };

  const handleOpenPurchaseLink = async (url: string, store: string) => {
    try {
      console.log(`🛒 Opening ${store}...`);
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open ${store} link`);
      }
    } catch (error) {
      console.error('❌ Error opening link:', error);
      Alert.alert('Error', 'Failed to open purchase link');
    }
  };

  const renderRoutineStep = (step: any, index: number) => {
    const isProductLoading = loadingProducts === step.productType;
    
    return (
      <View key={index} style={styles.routineStep}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>{index + 1}</Text>
        </View>
        <View style={styles.stepInfo}>
          <Text style={styles.stepName}>{step.step}</Text>
          <Text style={styles.productType}>{step.productType}</Text>
          <Text style={styles.stepDescription}>{step.description}</Text>
          
          <View style={styles.ingredientsSection}>
            <Text style={styles.ingredientsTitle}>Key Ingredients:</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.ingredientsScrollView}
            >
              <View style={styles.ingredientsList}>
                {step.keyIngredients?.map((ingredient: string, idx: number) => (
                  <View key={idx} style={styles.ingredientTag}>
                    <Text style={styles.ingredientText}>{ingredient}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.examplesSection}>
            <Text style={styles.examplesTitle}>Product Examples:</Text>
            <ScrollView 
              style={styles.examplesScrollView}
              showsVerticalScrollIndicator={false}
            >
              {step.productExamples?.map((example: string, idx: number) => (
                <Text key={idx} style={styles.exampleText}>• {example}</Text>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity 
            style={[
              styles.suggestProductsButton,
              isProductLoading && styles.suggestProductsButtonDisabled
            ]}
            onPress={() => handleGetProductSuggestions(step.productType)}
            disabled={isProductLoading}
          >
            {isProductLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#EC4899" />
                <Text style={styles.suggestProductsText}>Loading...</Text>
              </View>
            ) : (
              <Text style={styles.suggestProductsText}>
                Get {step.productType} Recommendations
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.personalizedContainer}>
      {/* Header */}
      <BlurView intensity={15} style={styles.routineHeaderCard}>
        <View style={styles.routineHeaderTop}>
          <TouchableOpacity 
            style={styles.concernsBackButton} 
            onPress={onBack}
            disabled={loadingProducts !== ''}
          >
            <ArrowLeft size={20} color={loadingProducts !== '' ? '#9CA3AF' : '#6B7280'} />
            <Text style={[
              styles.concernsBackButtonText,
              loadingProducts !== '' && styles.disabledText
            ]}>
              Back
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={onReset}
            disabled={loadingProducts !== ''}
          >
            <RotateCcw size={18} color={loadingProducts !== '' ? '#9CA3AF' : '#EC4899'} />
            <Text style={[
              styles.resetButtonText,
              loadingProducts !== '' && styles.disabledText
            ]}>
              New Analysis
            </Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.routineTitle}>Your Personalized Routine</Text>
        <Text style={styles.routineSubtitle}>
          For {skinType} skin • {concerns.join(', ')}
        </Text>
      </BlurView>

      {/* Routine Tabs */}
      <View style={styles.routineTabs}>
        {[
          { key: 'morning' as const, icon: Sun, label: 'Morning' },
          { key: 'evening' as const, icon: Moon, label: 'Evening' },
          { key: 'weekly' as const, icon: Calendar, label: 'Weekly' }
        ].map(({ key, icon: Icon, label }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.routineTab, 
              activeTab === key && styles.routineTabActive,
              loadingProducts !== '' && styles.routineTabDisabled
            ]}
            onPress={() => setActiveTab(key)}
            disabled={loadingProducts !== ''}
          >
            <Icon size={20} color={
              loadingProducts !== '' ? '#9CA3AF' : 
              activeTab === key ? '#EC4899' : '#6B7280'
            } />
            <Text style={[
              styles.routineTabText, 
              activeTab === key && styles.routineTabTextActive,
              loadingProducts !== '' && styles.disabledText
            ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Routine Content */}
      <ScrollView style={styles.routineContent} showsVerticalScrollIndicator={false}>
        {routine[activeTab]?.map(renderRoutineStep)}
        
        {/* Tips Section */}
        {activeTab === 'weekly' && routine.tips && (
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>Pro Tips</Text>
            <ScrollView 
              style={styles.tipsScrollView}
              showsVerticalScrollIndicator={false}
            >
              {routine.tips.map((tip: string, index: number) => (
                <View key={index} style={styles.tipItem}>
                  <Text style={styles.tipBullet}>•</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Product Suggestions Modal */}
      {productSuggestions.length > 0 && (
        <View style={styles.productSuggestionsOverlay}
        >
          <BlurView intensity={20} style={styles.productSuggestionsModal}>
            <View style={styles.productSuggestionsHeader}>
              <Text style={styles.productSuggestionsTitle}>
                {selectedProductType} Recommendations
              </Text>
              <TouchableOpacity 
                style={styles.closeSuggestionsButton}
                onPress={() => setProductSuggestions([])}
              >
                <Text style={styles.closeSuggestionsText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              style={styles.productSuggestionsList} 
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.productSuggestionsContent}
              bounces={true}
              scrollEventThrottle={16}
            >
              {productSuggestions.map((product, index) => (
                <View key={index} style={styles.productSuggestionItem}>
                  {/* Product Image */}
                  <View style={styles.productImageContainer}>
                    <Image 
                      source={{ uri: product.imageUrl }} 
                      style={styles.productImage}
                      defaultSource={{ uri: 'https://images.unsplash.com/photo-1556228578-6dde61e9d70e?w=400&h=400&fit=crop' }}
                    />
                    <View style={styles.productBadge}>
                      <ShoppingBag size={12} color="#fff" />
                    </View>
                  </View>
                  
                  {/* Product Info */}
                  <View style={styles.productInfo}>
                    <Text style={styles.suggestionProductName}>{product.name}</Text>
                    <Text style={styles.suggestionProductBrand}>{product.brand}</Text>
                    <Text style={styles.suggestionProductPrice}>{product.priceRange}</Text>
                    
                    <View style={styles.productBenefits}>
                      {product.benefits?.slice(0, 3).map((benefit, idx) => (
                        <Text key={idx} style={styles.productBenefit}>✓ {benefit}</Text>
                      ))}
                    </View>
                    
                    {/* Purchase Links */}
                    <View style={styles.purchaseLinks}>
                      <Text style={styles.purchaseLinksTitle}>Buy from:</Text>
                      <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        style={styles.purchaseLinksScrollView}
                      >
                        <View style={styles.purchaseLinksList}>
                          {product.purchaseLinks?.slice(0, 3).map((link, idx) => (
                            <TouchableOpacity
                              key={idx}
                              style={styles.purchaseLinkButton}
                              onPress={() => handleOpenPurchaseLink(link.url, link.store)}
                            >
                              <ExternalLink size={12} color="#EC4899" />
                              <Text style={styles.purchaseLinkText}>{link.store}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
            
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => setProductSuggestions([])}
            >
              <Text style={styles.closeModalButtonText}>Close Recommendations</Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      )}

      {/* Global Loading Overlay */}
      {loadingProducts !== '' && (
        <View style={styles.globalLoadingOverlay}>
          <BlurView intensity={20} style={styles.loadingBlur}>
            <ActivityIndicator size="large" color="#EC4899" />
            <Text style={styles.loadingText}>
              Loading {loadingProducts} recommendations...
            </Text>
            <Text style={styles.loadingSubtext}>
              Finding the best products for you
            </Text>
          </BlurView>
        </View>
      )}
    </View>
  );
}