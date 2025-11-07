import { View, Text, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Camera, FileText, Loader } from 'lucide-react-native';
import { styles } from './common/styles';

interface AnalysisOptionsProps {
  onPickImage: () => void;
  onStartQuestionnaire: () => void;
  isAnalyzing: boolean;
  isUploading: boolean;
}

export default function AnalysisOptions({ 
  onPickImage, 
  onStartQuestionnaire, 
  isAnalyzing, 
  isUploading 
}: AnalysisOptionsProps) {
  return (
    <View style={styles.optionsSection}>
      <Text style={styles.optionsTitle}>Choose Analysis Method</Text>
      <View style={styles.optionsRow}>
        <TouchableOpacity 
          style={[styles.optionCard, (isAnalyzing || isUploading) && styles.optionCardDisabled]}
          onPress={onPickImage}
          disabled={isAnalyzing || isUploading}
        >
          <BlurView intensity={15} style={styles.optionBlur}>
            {isAnalyzing ? (
              <Loader size={32} color="#EC4899" />
            ) : (
              <Camera size={32} color="#EC4899" />
            )}
            <Text style={styles.optionText}>
              {isAnalyzing ? 'Analyzing...' : 'Upload Photo'}
            </Text>
          </BlurView>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.optionCard, (isAnalyzing || isUploading) && styles.optionCardDisabled]}
          onPress={onStartQuestionnaire}
          disabled={isAnalyzing || isUploading}
        >
          <BlurView intensity={15} style={styles.optionBlur}>
            <FileText size={32} color="#EC4899" />
            <Text style={styles.optionText}>Fill Questionnaire</Text>
          </BlurView>
        </TouchableOpacity>
      </View>
    </View>
  );
}