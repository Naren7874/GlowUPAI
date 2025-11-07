import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Professional Color Palette
const colors = {
  primary: '#6366F1',      // Indigo
  primaryDark: '#4F46E5',  // Darker indigo
  secondary: '#EC4899',    // Pink
  accent: '#10B981',       // Emerald
  background: '#F8FAFC',   // Light gray
  surface: '#FFFFFF',      // White
  surfaceElevated: '#F1F5F9', // Elevated surface
  text: {
    primary: '#1E293B',    // Dark slate
    secondary: '#64748B',  // Slate
    tertiary: '#94A3B8',  // Light slate
    inverse: '#FFFFFF',   // White
  },
  border: '#E2E8F0',      // Light border
  borderDark: '#CBD5E1',  // Darker border
  success: '#10B981',     // Green
  warning: '#F59E0B',     // Amber
  error: '#EF4444',       // Red
  info: '#3B82F6',        // Blue
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.secondary,
    marginBottom: 32,
    lineHeight: 24,
  },
  optionsSection: {
    marginBottom: 32,
  },
  optionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  optionCard: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionCardDisabled: {
    opacity: 0.5,
  },
  optionBlur: {
    padding: 24,
    alignItems: 'center',
    gap: 16,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 22,
  },
  // Image Preview Styles
  imagePreviewSection: {
    marginBottom: 24,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  imagePreviewContainer: {
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  primaryButton: {
    borderRadius: 16,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
    backgroundColor: colors.text.tertiary,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.inverse,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    borderRadius: 16,
    backgroundColor: colors.surface,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  // Error Message Styles
  errorContainer: {
    backgroundColor: `${colors.error}10`,
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: `${colors.error}30`,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.error,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
    lineHeight: 20,
  },
  errorIcon: {
    marginBottom: 12,
  },
  // Success Message Styles
  successContainer: {
    backgroundColor: `${colors.success}10`,
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: `${colors.success}30`,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.success,
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
    lineHeight: 20,
  },
  detectionSection: {
    marginBottom: 32,
  },
  detectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resetButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    borderRadius: 8,
  },
  resetButtonText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
  },
  detectionTitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  skinType: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  confidence: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
    marginBottom: 12,
  },
  concernsContainer: {
    marginBottom: 12,
  },
  concernsTitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  concernsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  concernTag: {
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  concernText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
  },
  skinDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  routineSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
  },
  routineCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  routineBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
  },
  routineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  routineTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  routineStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondary,
  },
  stepInfo: {
    flex: 1,
  },
  stepName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  productName: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  productsSection: {
    marginBottom: 24,
  },
  productsScroll: {
    marginLeft: -24,
    paddingLeft: 24,
  },
  productCard: {
    width: 160,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  productBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 16,
  },
  productImagePlaceholder: {
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  productCardName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
    lineHeight: 18,
  },
  productBrand: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondary,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: colors.text.primary,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 120,
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
  },
  modalBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
  },
  progressContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(236, 72, 153, 0.2)',
    marginHorizontal: 24,
    borderRadius: 2,
    marginBottom: 32,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 2,
  },
  questionContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    lineHeight: 28,
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  optionButtonSelected: {
    transform: [{ scale: 0.98 }],
  },
  optionButtonBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionButtonText: {
    fontSize: 16,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 22,
  },
  optionButtonTextSelected: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  navButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  navButtonTextDisabled: {
    color: colors.text.tertiary,
  },
  nextButton: {
    flex: 1.5,
  },
  nextButtonGradient: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },

  // Concerns Selection Styles
  concernsSelectionContainer: {
    marginBottom: 24,
  },
  concernsSelectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 20,
  },
  concernsSelectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  concernsSelectionSubtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 24,
    lineHeight: 22,
  },
  ageSection: {
    marginBottom: 20,
  },
  budgetSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  ageOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ageOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  ageOptionSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  ageText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  ageTextSelected: {
    color: '#FFFFFF',
  },
  budgetOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  budgetOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  budgetOptionSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  budgetText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
    textAlign: 'center',
  },
  budgetTextSelected: {
    color: '#FFFFFF',
  },
  concernsListSection: {
    marginBottom: 24,
  },
  concernsScroll: {
    maxHeight: 300,
  },
  concernsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  concernItem: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  concernItemSelected: {
    transform: [{ scale: 0.98 }],
  },
  concernBlur: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  concernName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  concernNameSelected: {
    color: colors.secondary,
  },
  concernDescription: {
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 16,
  },
  concernSelectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  concernsActions: {
    flexDirection: 'row',
    gap: 12,
  },
  concernsBackButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  concernsBackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  generateButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  generateButtonDisabled: {
    opacity: 0.5,
  },
  generateButtonBlur: {
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(236, 72, 153, 0.9)',
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Personalized Routine Styles
  personalizedContainer: {
    marginBottom: 24,
  },
  routineHeaderCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  routineHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routineTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  routineSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  fallbackSourceText: {
    color: colors.warning,
  },
  routineTabs: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  routineTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  routineTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  routineTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  routineTabTextActive: {
    color: colors.secondary,
  },
  routineContent: {
    maxHeight: 500,
  },
  productType: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: '600',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  ingredientsSection: {
    marginBottom: 12,
  },
  ingredientsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  ingredientTag: {
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ingredientText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '500',
  },
  examplesSection: {
    marginBottom: 12,
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 6,
  },
  exampleText: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  suggestProductsButton: {
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  suggestProductsText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '600',
  },
  tipsSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 16,
    color: colors.secondary,
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },

  // Product Suggestions Styles
  productSuggestionsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 1000,
  },
  productSuggestionsModal: {
    width: '100%',
    maxHeight: '80%',
    minHeight: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  productSuggestionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  productSuggestionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
  },
  productSuggestionsList: {
    flex: 1,
    marginBottom: 16,
    maxHeight: '100%',
  },
  productSuggestionsContent: {
    paddingBottom: 20,
    flexGrow: 1,
    paddingTop: 8,
  },
  productSuggestionItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
  },
  productImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  productBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.secondary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  suggestionProductName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  suggestionProductBrand: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  suggestionProductPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary,
    marginBottom: 8,
  },
  benefitsScrollView: {
    maxHeight: 80,
    marginVertical: 8,
    flexGrow: 0,
  },
  productBenefits: {
    marginBottom: 12,
    maxHeight: 80,
  },
  productBenefit: {
    fontSize: 12,
    color: colors.success,
    marginBottom: 2,
  },
  purchaseLinks: {
    marginTop: 8,
  },
  purchaseLinksTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: 6,
  },
  purchaseLinksScrollView: {
    marginTop: 8,
  },
  purchaseLinksList: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  purchaseLinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
    marginRight: 6,
  },
  purchaseLinkText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.secondary,
  },
  closeSuggestionsButton: {
    padding: 4,
  },
  closeSuggestionsText: {
    fontSize: 18,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  closeModalButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  closeModalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Loading states
  suggestProductsButtonDisabled: {
    opacity: 0.6,
  },
  routineTabDisabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.text.tertiary,
  },

  // Scrollable areas
  ingredientsScrollView: {
    marginTop: 8,
  },
  examplesScrollView: {
    maxHeight: 120,
    marginTop: 8,
  },
  tipsScrollView: {
    maxHeight: 200,
  },

  // Global Loading Overlay
  globalLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingBlur: {
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: 16,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 8,
    textAlign: 'center',
  },

  // Additional styles
  customizeButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  customizeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});