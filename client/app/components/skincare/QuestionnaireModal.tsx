import { View, Text, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { X, ChevronRight } from 'lucide-react-native';
import { styles } from './common/styles';

interface QuestionnaireModalProps {
  visible: boolean;
  currentQuestion: number;
  answers: Record<string, string | string[]>;
  isUploading: boolean;
  isAnswered: boolean;
  questionnaire: any[];
  onClose: () => void;
  onAnswer: (questionCode: string, optionKey: string) => void;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
}

export default function QuestionnaireModal({
  visible,
  currentQuestion,
  answers,
  isUploading,
  isAnswered,
  questionnaire,
  onClose,
  onAnswer,
  onPrevQuestion,
  onNextQuestion
}: QuestionnaireModalProps) {
  const currentQ = questionnaire[currentQuestion];

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.modalContainer}>
        <LinearGradient colors={['#fef7ff', '#f0fdf4', '#ffffff']} style={styles.modalBackground} />
        
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Skin Analysis Quiz</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>{currentQuestion + 1}/{questionnaire.length}</Text>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentQuestion + 1) / questionnaire.length) * 100}%` }]} />
        </View>

        <ScrollView style={styles.questionContainer} showsVerticalScrollIndicator={false}>
          {currentQ && (
            <>
              <Text style={styles.questionText}>{currentQ.text}</Text>
              <View style={styles.optionsContainer}>
                {currentQ.options.map((option:any) => {
                  const isSelected = currentQ.type === 'single' 
                    ? answers[currentQ.code] === option.key
                    : (answers[currentQ.code] as string[] || []).includes(option.key);
                  
                  return (
                    <TouchableOpacity
                      key={option.key}
                      style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
                      onPress={() => onAnswer(currentQ.code, option.key)}
                      disabled={isUploading}
                    >
                      <BlurView intensity={isSelected ? 20 : 10} style={styles.optionButtonBlur}>
                        <Text style={[styles.optionButtonText, isSelected && styles.optionButtonTextSelected]}>
                          {option.label}
                        </Text>
                        {isSelected && (
                          <View style={styles.selectedIndicator}>
                            <Text style={styles.checkmark}>✓</Text>
                          </View>
                        )}
                      </BlurView>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}
        </ScrollView>

        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={[styles.navButton, currentQuestion === 0 && styles.navButtonDisabled]}
            onPress={onPrevQuestion}
            disabled={currentQuestion === 0 || isUploading}
          >
            <BlurView intensity={15} style={styles.navButtonBlur}>
              <Text style={[styles.navButtonText, currentQuestion === 0 && styles.navButtonTextDisabled]}>
                Previous
              </Text>
            </BlurView>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navButton, styles.nextButton, (!isAnswered || isUploading) && styles.navButtonDisabled]}
            onPress={onNextQuestion}
            disabled={!isAnswered || isUploading}
          >
            <LinearGradient
              colors={isAnswered && !isUploading ? ['#EC4899', '#F472B6'] : ['#D1D5DB', '#D1D5DB']}
              style={styles.nextButtonGradient}
            >
              {isUploading ? (
                <ActivityIndicator size="small" color="#9CA3AF" />
              ) : (
                <>
                  <Text style={[styles.nextButtonText, (!isAnswered || isUploading) && styles.navButtonTextDisabled]}>
                    {currentQuestion === questionnaire.length - 1 ? 'Analyze' : 'Next'}
                  </Text>
                  <ChevronRight size={20} color={isAnswered && !isUploading ? "#fff" : "#9CA3AF"} />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}