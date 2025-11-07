// app/utils/geminiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = 'AIzaSyCeQh_CWuWwRD-b3sK1TiOByDfV_uAZbRg';
const genAI = new GoogleGenerativeAI(apiKey || '');

export interface SkincareConcern {
  id: string;
  name: string;
  description: string;
}

export interface PersonalizedRoutine {
  morning: RoutineStep[];
  evening: RoutineStep[];
  weekly: RoutineStep[];
  tips: string[];
}

export interface RoutineStep {
  step: string;
  productType: string;
  description: string;
  keyIngredients: string[];
  productExamples: string[];
}

export interface ProductSuggestion {
  name: string;
  brand: string;
  type: string;
  priceRange: string;
  keyIngredients: string[];
  benefits: string[];
  bestFor: string[];
  whereToBuy: string[];
  imageUrl?: string;
  purchaseLinks: { store: string; url: string }[];
}

export const skincareConcerns: SkincareConcern[] = [
  {
    id: 'dark_spots',
    name: 'Dark Spots & Hyperpigmentation',
    description: 'Even out skin tone and reduce dark spots'
  },
  {
    id: 'acne',
    name: 'Acne & Breakouts',
    description: 'Control breakouts and prevent future acne'
  },
  {
    id: 'pimples',
    name: 'Pimples & Blemishes',
    description: 'Reduce active pimples and heal blemishes'
  },
  {
    id: 'aging',
    name: 'Aging & Wrinkles',
    description: 'Reduce fine lines and improve skin elasticity'
  },
  {
    id: 'dryness',
    name: 'Dryness & Dehydration',
    description: 'Boost hydration and restore moisture barrier'
  },
  {
    id: 'oiliness',
    name: 'Oiliness & Shine',
    description: 'Control excess oil and minimize pores'
  },
  {
    id: 'sensitivity',
    name: 'Sensitivity & Redness',
    description: 'Calm irritated skin and reduce redness'
  },
  {
    id: 'dullness',
    name: 'Dullness & Uneven Texture',
    description: 'Brighten complexion and smooth texture'
  },
  {
    id: 'pores',
    name: 'Large Pores',
    description: 'Minimize appearance of enlarged pores'
  },
  {
    id: 'redness',
    name: 'Redness & Rosacea',
    description: 'Reduce facial redness and calm inflammation'
  }
];

export const generatePersonalizedRoutine = async (
  skinType: string,
  concerns: string[],
  budget: string = 'medium',
  age: number = 25
): Promise<PersonalizedRoutine> => {
  try {
    console.log('🔄 Generating personalized routine...', { skinType, concerns, budget, age });
    
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an expert skincare dermatologist and cosmetic formulator. 
Create a detailed personalized skincare routine for someone with ${skinType} skin.

Skin Concerns: ${concerns.join(', ')}
Budget: ${budget}
Age: ${age}

Return the response as a clean JSON object with the following exact structure:
{
  "morning": [
    {
      "step": "Step name",
      "productType": "Type of product",
      "description": "Detailed description of what this step does and why it's important",
      "keyIngredients": ["ingredient1", "ingredient2", "ingredient3"],
      "productExamples": ["Brand Product 1", "Brand Product 2", "Brand Product 3"]
    }
  ],
  "evening": [
    {
      "step": "Step name", 
      "productType": "Type of product",
      "description": "Detailed description",
      "keyIngredients": ["ingredient1", "ingredient2"],
      "productExamples": ["Brand Product 1", "Brand Product 2"]
    }
  ],
  "weekly": [
    {
      "step": "Step name",
      "productType": "Type of product", 
      "description": "Detailed description",
      "keyIngredients": ["ingredient1", "ingredient2"],
      "productExamples": ["Brand Product 1", "Brand Product 2"]
    }
  ],
  "tips": ["Practical tip 1", "Practical tip 2", "Practical tip 3", "Practical tip 4", "Practical tip 5"]
}

Rules:
- Provide 3-4 steps for morning routine
- Provide 4-5 steps for evening routine  
- Provide 1-2 steps for weekly treatments
- Include 5 practical tips
- Focus on products available in the Indian market
- Make recommendations practical and affordable for the budget
- Address the specific skin concerns mentioned
- Use realistic product examples from popular Indian brands
- Output only valid JSON, no additional text
- Ensure all arrays have the specified number of items
`;

    console.log('📤 Sending request to Gemini API...');
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Gemini API response received');

    const cleanedText = text.replace(/```(?:json)?\n?|```/g, "").trim();
    
    try {
      const routine = JSON.parse(cleanedText);
      console.log('✅ Successfully parsed routine from Gemini');
      
      if (!routine.morning || !routine.evening || !routine.weekly || !routine.tips) {
        throw new Error('Invalid routine structure from AI');
      }
      
      return routine;
    } catch (parseError) {
      console.error('❌ Error parsing Gemini response:', parseError);
      throw new Error('Failed to parse AI response');
    }

  } catch (error) {
    console.error('❌ Gemini API error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes('API key') || errorMessage.includes('API_KEY')) {
      throw new Error('Invalid API key. Please check your Gemini API configuration.');
    } else if (errorMessage.includes('quota') || errorMessage.includes('rate limit')) {
      throw new Error('API quota exceeded. Please try again later.');
    } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    
    throw new Error('Unable to generate personalized routine. Please try again.');
  }
};

export const getProductRecommendations = async (
  skinType: string,
  concerns: string[],
  productType: string,
  budget: string = 'medium'
): Promise<ProductSuggestion[]> => {
  try {
    console.log('🔄 Getting product recommendations...', { skinType, concerns, productType, budget });
    
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a skincare expert and product recommender.
Recommend 3-5 skincare products for ${productType} suitable for ${skinType} skin.

Concerns: ${concerns.join(', ')}
Budget: ${budget}
Product Type: ${productType}

Return the response as a JSON array with this exact structure:
[
  {
    "name": "Product Name",
    "brand": "Brand Name", 
    "type": "Product Type",
    "priceRange": "Price in INR (e.g., ₹599)",
    "keyIngredients": ["ingredient1", "ingredient2", "ingredient3"],
    "benefits": ["benefit1", "benefit2", "benefit3"],
    "bestFor": ["skin concern1", "skin concern2"],
    "whereToBuy": ["Nykaa", "Amazon", "Purplle"],
    "imageUrl": "realistic_product_image_url",
    "purchaseLinks": [
      {"store": "Nykaa", "url": "https://www.nykaa.com/search/..."},
      {"store": "Amazon", "url": "https://www.amazon.in/s?k=..."}
    ]
  }
]

Rules:
- Recommend 3-5 products total
- Focus on products available in India
- Include popular Indian and international brands available in India
- Make recommendations practical and within the specified budget
- Include specific benefits for the mentioned skin concerns
- Provide realistic price ranges in Indian Rupees
- List actual stores where these products can be purchased in India
- Provide realistic image URLs (use placeholder if needed)
- Include actual purchase links to Indian e-commerce sites
- Output only valid JSON array, no additional text
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = text.replace(/```(?:json)?\n?|```/g, "").trim();
    
    try {
      const products = JSON.parse(cleanedText);
      console.log('✅ Successfully parsed product recommendations from Gemini');
      
      // Enhance products with fallback images and links
      return products.map((product: ProductSuggestion) => ({
        ...product,
        imageUrl: product.imageUrl || getFallbackProductImage(product.brand, product.name),
        purchaseLinks: product.purchaseLinks || getFallbackPurchaseLinks(product.brand, product.name)
      }));
    } catch (parseError) {
      console.error('❌ Error parsing product recommendations:', parseError);
      throw new Error('Failed to parse product recommendations');
    }

  } catch (error) {
    console.error('❌ Gemini product recommendations error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes('API key') || errorMessage.includes('API_KEY')) {
      throw new Error('Invalid API key. Please check your Gemini API configuration.');
    } else if (errorMessage.includes('quota') || errorMessage.includes('rate limit')) {
      throw new Error('API quota exceeded. Please try again later.');
    } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    
    throw new Error('Unable to get product recommendations. Please try again.');
  }
};

// Helper functions for fallback data
const getFallbackProductImage = (brand: string, productName: string): string => {
  const brandImages: { [key: string]: string } = {
    'Minimalist': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    'The Derma Co.': 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    'Dot & Key': 'https://images.unsplash.com/photo-1556228577-7e1dcd8d704d?w=400&h=400&fit=crop',
    'Dr. Sheth\'s': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    'Cetaphil': 'https://images.unsplash.com/photo-1556228579-4a5c98a501ff?w=400&h=400&fit=crop',
    'Neutrogena': 'https://images.unsplash.com/photo-1556228578-7cf84098d7a8?w=400&h=400&fit=crop'
  };
  
  return brandImages[brand] || 'https://images.unsplash.com/photo-1556228578-6dde61e9d70e?w=400&h=400&fit=crop';
};

const getFallbackPurchaseLinks = (brand: string, productName: string) => {
  const searchQuery = encodeURIComponent(`${brand} ${productName}`);
  return [
    { store: 'Nykaa', url: `https://www.nykaa.com/search/result/?q=${searchQuery}` },
    { store: 'Amazon', url: `https://www.amazon.in/s?k=${searchQuery}` },
    { store: 'Purplle', url: `https://www.purplle.com/search?q=${searchQuery}` }
  ];
};

// Test function
export const testGeminiService = async (): Promise<boolean> => {
  try {
    console.log('🧪 Testing Gemini service...');
    
    if (!apiKey) {
      console.log('❌ No API key - service will not work');
      return false;
    }

    const testRoutine = await generatePersonalizedRoutine('normal', ['acne'], 'medium', 25);
    console.log('✅ Gemini service test successful');
    return !!testRoutine;
  } catch (error) {
    console.error('❌ Gemini service test failed:', error);
    return false;
  }
};