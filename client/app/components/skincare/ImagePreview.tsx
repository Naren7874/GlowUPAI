import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './common/styles';

interface ImagePreviewProps {
  selectedImage: string | null;
  showResults: boolean;
  isAnalyzing: boolean;
  onAnalyzeImage: () => void;
}

export default function ImagePreview({ 
  selectedImage, 
  showResults, 
  isAnalyzing, 
  onAnalyzeImage 
}: ImagePreviewProps) {
  if (!selectedImage || showResults) return null;

  return (
    <View style={styles.imagePreviewSection}>
      <Text style={styles.previewTitle}>Selected Image</Text>
      <View style={styles.imagePreviewContainer}>
        <Image 
          source={{ uri: selectedImage }} 
          style={styles.previewImage}
        />
        <TouchableOpacity 
          style={[styles.analyzeButton, isAnalyzing && styles.analyzeButtonDisabled]}
          onPress={onAnalyzeImage}
          disabled={isAnalyzing}
        >
          <LinearGradient
            colors={isAnalyzing ? ['#D1D5DB', '#D1D5DB'] : ['#EC4899', '#F472B6']}
            style={styles.analyzeButtonGradient}
          >
            {isAnalyzing ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.analyzeButtonText}>Analyzing...</Text>
              </View>
            ) : (
              <Text style={styles.analyzeButtonText}>Analyze Image</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}