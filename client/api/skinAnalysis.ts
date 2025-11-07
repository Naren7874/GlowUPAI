// app/api/skinAnalysis.ts

const NYCKEL_API_URL = 'https://www.nyckel.com/v1/functions/skin-types-identifier/invoke';
const ACCESS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJpc3MiOiJodHRwczovL3d3dy5ueWNrZWwuY29tIiwibmJmIjoxNzYwMjY2NTYxLCJpYXQiOjE3NjAyNjY1NjEsImV4cCI6MTc2MDI3MDE2MSwic2NvcGUiOlsiYXBpIl0sImNsaWVudF9pZCI6InJ2aW45ZDdndHE2MHgwNG5lemE1anQwMmthdWQ0bXVpIiwianRpIjoiQTM0OEVFRTVDQkE1RTU4NThFODQyQkY3QzBEMkY5MzAifQ.QV76y3382XtLHN5Bdg5E3JebRInui_dS9px8USAsIRb9EQ9fqZ00nr0bkq-ncKSJvPD08sY7NhU8Mz2e28YTJyDL8Rc4MX_R8zzRq7MOl4RLXy8TXwldI-hkDaqedxrFvjCZrFCdDDBdTgwCJKtkosyNfEWRsDqPZJIyo6yMQvUG9MqcOYK7w3fhu-g_QGVm3FSjp_oG8niq2BubjADbKNyT_ssuZAxRwCJSari2tf-rIUboNySOwOCty6s9ZtSQEhjQAWI63E3_AatdmRixokpMYCpn-WTjlVA2Ac5Tx1IdlY2l8V7uWnaeYAT6tm-b48CIFzhWiUDUFljqEwQhZw';

export interface SkinAnalysisResult {
  skinType: string;
  confidence: number;
  concerns?: string[];
}

export interface NyckelApiResponse {
  labelName: string;
  confidence: number;
}

/**
 * Analyze skin type using Nyckel API with fallback
 */
export const analyzeSkinWithNyckel = async (imageBase64: string): Promise<SkinAnalysisResult> => {
  try {
    // Remove the data:image/... prefix if present
    const base64Data = imageBase64.includes('base64,') 
      ? imageBase64.split('base64,')[1] 
      : imageBase64;

    // Check if image is too large (more than 2MB base64 to be safe)
    if (base64Data.length > 2 * 1024 * 1024) {
      console.warn('Image too large, using fallback analysis');
      return await analyzeSkinFallback(imageBase64);
    }

    // Try with just the base64 data (no data URL prefix)
    const requestBody = {
      data: base64Data
    };

    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(NYCKEL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // If 400 error, try with data URL format
      if (response.status === 400) {
        const requestBodyWithDataUrl = {
          data: `data:image/jpeg;base64,${base64Data}`
        };
        
        const retryController = new AbortController();
        const retryTimeoutId = setTimeout(() => retryController.abort(), 30000);

        const retryResponse = await fetch(NYCKEL_API_URL, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBodyWithDataUrl),
          signal: retryController.signal,
        });

        clearTimeout(retryTimeoutId);
        
        if (!retryResponse.ok) {
          throw new Error('API request failed');
        }
        
        const retryData: NyckelApiResponse[] = await retryResponse.json();
        if (retryData && retryData.length > 0) {
          const topPrediction = retryData[0];
          return {
            skinType: formatSkinType(topPrediction.labelName),
            confidence: Math.round(topPrediction.confidence * 100),
          };
        }
      }
      
      throw new Error('API request failed');
    }

    const data: NyckelApiResponse[] = await response.json();
    
    if (!data || data.length === 0) {
      throw new Error('No analysis results received');
    }

    // Get the top prediction
    const topPrediction = data[0];
    
    return {
      skinType: formatSkinType(topPrediction.labelName),
      confidence: Math.round(topPrediction.confidence * 100), // Convert to percentage
    };
  } catch (error) {
    // Fallback to mock analysis if API fails
    return await analyzeSkinFallback(imageBase64);
  }
};

/**
 * Format the skin type label from API to match your app's format
 */
const formatSkinType = (labelName: string): string => {
  const typeMap: { [key: string]: string } = {
    'dry': 'Dry',
    'normal': 'Normal', 
    'oily': 'Oily',
    'combination': 'Combination',
    'sensitive': 'Sensitive',
  };
  
  return typeMap[labelName.toLowerCase()] || labelName;
};

/**
 * Fallback analysis for demo/offline use
 */
export const analyzeSkinFallback = async (imageBase64: string): Promise<SkinAnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const mockResults: SkinAnalysisResult[] = [
    { skinType: 'Oily', confidence: 85, concerns: ['Acne', 'Large Pores'] },
    { skinType: 'Dry', confidence: 78, concerns: ['Flakiness', 'Redness'] },
    { skinType: 'Combination', confidence: 82, concerns: ['Oily T-zone', 'Dry Cheeks'] },
    { skinType: 'Normal', confidence: 90, concerns: [] },
    { skinType: 'Sensitive', confidence: 75, concerns: ['Redness', 'Irritation'] },
  ];
  
  // Return a random result for demo purposes
  const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
  return randomResult;
};
