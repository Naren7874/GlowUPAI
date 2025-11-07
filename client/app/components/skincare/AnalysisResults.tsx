import { View, Text, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { styles } from './common/styles';

interface AnalysisResultsProps {
  showResults: boolean;
  analysisResult: any;
  selectedImage: string | null;
  onResetAnalysis: () => void;
  onCustomizeRoutine: () => void;
}
export default function AnalysisResults({ 
  showResults, 
  analysisResult, 
  selectedImage, 
  onResetAnalysis,
  onCustomizeRoutine 
}: AnalysisResultsProps) {
  if (!showResults || !analysisResult) return null;

  return (
    <View style={styles.detectionSection}>
      <BlurView intensity={15} style={styles.detectionCard}>
        <View style={styles.resultHeader}>
          <Text style={styles.detectionTitle}>Analysis Results</Text>
          <TouchableOpacity onPress={onResetAnalysis} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>New Analysis</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.skinType}>{analysisResult.skinType} Skin</Text>
        <Text style={styles.confidence}>Confidence: {analysisResult.confidence}%</Text>
        
        {analysisResult.concerns && analysisResult.concerns.length > 0 && (
          <View style={styles.concernsContainer}>
            <Text style={styles.concernsTitle}>Detected Concerns:</Text>
            <View style={styles.concernsTags}>
              {analysisResult.concerns.map((concern: string, index: number) => (
                <View key={index} style={styles.concernTag}>
                  <Text style={styles.concernText}>{concern}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        <Text style={styles.skinDescription}>
          {selectedImage 
            ? "Based on image analysis, we've identified your skin type and concerns."
            : "Based on your responses, we've identified your skin type and concerns."
          }
          Here's your personalized skincare routine below.
        </Text>

        {/* Add this button to trigger the concerns selection */}
        <TouchableOpacity 
          style={styles.customizeButton}
          onPress={onCustomizeRoutine}
        >
          <Text style={styles.customizeButtonText}>Customize Your Routine</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}