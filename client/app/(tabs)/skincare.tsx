import { View, Text, ScrollView, StyleSheet, Dimensions, StatusBar, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { questionnaire, analyzeAnswers } from '@/api/questionnaireData';
import { analyzeSkinWithNyckel, analyzeSkinFallback } from '@/api/skinAnalysis';
import { generatePersonalizedRoutine, PersonalizedRoutine } from '@/api/geminiService';
import AnalysisOptions from '@/app/components/skincare/AnalysisOptions';
import ImagePreview from '@/app/components/skincare/ImagePreview';
import AnalysisResults from '@/app/components/skincare/AnalysisResults';
import ConcernsSelection from '@/app/components/skincare/ConcernsSelection';
import PersonalizedRoutineDisplay from '@/app/components/skincare/PersonalizedRoutineDisplay';
import QuestionnaireModal from '@/app/components/skincare/QuestionnaireModal';
import ErrorMessage from '@/app/components/skincare/ErrorMessage';
import { styles } from '@/app/components/skincare/common/styles';

const { width } = Dimensions.get('window');

export default function SkincareScreen() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [personalizedRoutine, setPersonalizedRoutine] = useState<PersonalizedRoutine | null>(null);
  const [userConcerns, setUserConcerns] = useState<string[]>([]);
  const [showConcernsSelection, setShowConcernsSelection] = useState(false);
  const [showPersonalizedRoutine, setShowPersonalizedRoutine] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      setImageBase64(null);
      setSelectedImage(null);
      setAnalysisResult(null);
    };
  }, []);

  const handleAnswer = (questionCode: string, optionKey: string) => {
    const question = questionnaire.find(q => q.code === questionCode);
    if (!question) return;

    if (question.type === 'single') {
      setAnswers(prev => ({ ...prev, [questionCode]: optionKey }));
    } else {
      const currentAnswers = (answers[questionCode] as string[]) || [];
      let newAnswers;
      
      if (optionKey === 'f') {
        newAnswers = ['f'];
      } else {
        newAnswers = currentAnswers.includes(optionKey)
          ? currentAnswers.filter(a => a !== optionKey && a !== 'f')
          : [...currentAnswers.filter(a => a !== 'f'), optionKey];
      }
      
      setAnswers(prev => ({ ...prev, [questionCode]: newAnswers }));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questionnaire.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = analyzeAnswers(answers);
      setAnalysisResult(result);
      setShowQuestionnaire(false);
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const startQuestionnaire = () => {
    setShowQuestionnaire(true);
    setCurrentQuestion(0);
    setAnswers({});
    setAnalysisResult(null);
    setShowResults(false);
    setShowConcernsSelection(false);
    setShowPersonalizedRoutine(false);
  };

  const closeQuestionnaire = () => {
    setShowQuestionnaire(false);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const pickImage = async () => {
    try {
      setAnalysisResult(null);
      setShowResults(false);
      setShowConcernsSelection(false);
      setShowPersonalizedRoutine(false);
      setSelectedImage(null);
      setImageBase64(null);

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
        base64: true,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        setSelectedImage(asset.uri);
        setImageBase64(asset.base64 || null);
        Alert.alert('Success', 'Image selected! Ready for analysis.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const analyzeImageWithAPI = async () => {
    if (!imageBase64) {
      Alert.alert('Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const result = await Promise.race([
        analyzeSkinWithNyckel(imageBase64),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Analysis timeout - using fallback')), 35000)
        )
      ]);
      
      setImageBase64(null);
      
      setTimeout(() => {
        setAnalysisResult({
          skinType: result.skinType,
          confidence: result.confidence,
          concerns: result.concerns || []
        });
        setShowResults(true);
      }, 100);
      
      Alert.alert('Success', 'Image analysis completed!');
    } catch (error) {
      const fallbackResult = await analyzeSkinFallback(imageBase64);
      setImageBase64(null);
      
      setTimeout(() => {
        setAnalysisResult({
          skinType: fallbackResult.skinType,
          confidence: fallbackResult.confidence,
          concerns: fallbackResult.concerns || []
        });
        setShowResults(true);
      }, 100);
      
      Alert.alert(
        'Analysis Complete', 
        'Using fallback analysis due to API issues. Results may vary.'
      );
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 200);
    }
  };

  const handleConcernsSelected = async (concerns: string[], budget: string, age: number) => {
    if (!analysisResult) return;

    try {
      setIsUploading(true);
      setError(null);
      
      const routine = await generatePersonalizedRoutine(
        analysisResult.skinType,
        concerns,
        budget,
        age
      );
      
      setPersonalizedRoutine(routine);
      setUserConcerns(concerns);
      setShowConcernsSelection(false);
      setShowPersonalizedRoutine(true);
      
    } catch (error) {
      console.error('Error generating routine:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate personalized routine. Please try again.';
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setShowResults(false);
    setShowConcernsSelection(false);
    setShowPersonalizedRoutine(false);
    setSelectedImage(null);
    setImageBase64(null);
    setPersonalizedRoutine(null);
    setUserConcerns([]);
    setAnswers({});
    setIsAnalyzing(false);
    setIsUploading(false);
    setError(null);
  };

  const currentQ = questionnaire[currentQuestion];
  const isAnswered = currentQ && (
    (currentQ.type === 'single' && answers[currentQ.code]) ||
    (currentQ.type === 'multi' && answers[currentQ.code] && (answers[currentQ.code] as string[]).length > 0)
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <LinearGradient
        colors={['#fef7ff', '#f0fdf4', '#ffffff']}
        style={styles.background}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Skincare Analysis</Text>
        <Text style={styles.subtitle}>
          Get personalized skincare recommendations
        </Text>
        
        {error && (
          <ErrorMessage
            title="Unable to Generate Routine"
            message={error}
            onRetry={() => setError(null)}
            showRetry={true}
          />
        )}
        
        <AnalysisOptions
          onPickImage={pickImage}
          onStartQuestionnaire={startQuestionnaire}
          isAnalyzing={isAnalyzing}
          isUploading={isUploading}
        />

        <ImagePreview
          selectedImage={selectedImage}
          showResults={showResults}
          isAnalyzing={isAnalyzing}
          onAnalyzeImage={analyzeImageWithAPI}
        />

        {showResults && analysisResult && !showConcernsSelection && !showPersonalizedRoutine && (
          <AnalysisResults
            showResults={showResults}
            analysisResult={analysisResult}
            selectedImage={selectedImage}
            onResetAnalysis={resetAnalysis}
            onCustomizeRoutine={() => setShowConcernsSelection(true)}
          />
        )}

        {showConcernsSelection && analysisResult && (
          <ConcernsSelection
            skinType={analysisResult.skinType}
            onConcernsSelected={handleConcernsSelected}
            onBack={() => setShowConcernsSelection(false)}
          />
        )}

        {showPersonalizedRoutine && personalizedRoutine && (
          <PersonalizedRoutineDisplay
            routine={personalizedRoutine}
            skinType={analysisResult?.skinType || ''}
            concerns={userConcerns}
            onBack={() => setShowPersonalizedRoutine(false)}
            onReset={resetAnalysis}
          />
        )}

        {/* Default State - No Analysis Completed */}
        {!showResults && !selectedImage && !showConcernsSelection && !showPersonalizedRoutine && (
          <View style={styles.detectionSection}>
            <BlurView intensity={15} style={styles.detectionCard}>
              <Text style={styles.detectionTitle}>Get Started</Text>
              <Text style={styles.skinType}>Choose Analysis Method</Text>
              <Text style={styles.skinDescription}>
                Upload a photo of your skin or complete our detailed questionnaire 
                to get personalized skincare recommendations based on your skin type and concerns.
              </Text>
            </BlurView>
          </View>
        )}
        
        <View style={styles.bottomPadding} />
      </ScrollView>

      <QuestionnaireModal
        visible={showQuestionnaire}
        currentQuestion={currentQuestion}
        answers={answers}
        isUploading={isUploading}
        isAnswered={isAnswered}
        questionnaire={questionnaire}
        onClose={closeQuestionnaire}
        onAnswer={handleAnswer}
        onPrevQuestion={prevQuestion}
        onNextQuestion={nextQuestion}
      />
    </View>
  );
}