import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { Check } from 'lucide-react-native';
import { skincareConcerns, SkincareConcern } from '@/api/geminiService';
import { styles } from './common/styles';

interface ConcernsSelectionProps {
  skinType: string;
  onConcernsSelected: (concerns: string[], budget: string, age: number) => void;
  onBack: () => void;
}

export default function ConcernsSelection({ skinType, onConcernsSelected, onBack }: ConcernsSelectionProps) {
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>('medium');
  const [age, setAge] = useState<number>(25);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleConcern = (concernId: string) => {
    setSelectedConcerns(prev => 
      prev.includes(concernId) 
        ? prev.filter(id => id !== concernId)
        : [...prev, concernId]
    );
  };

  const handleGenerateRoutine = async () => {
    if (selectedConcerns.length === 0) {
      Alert.alert('Please select at least one concern');
      return;
    }

    setIsGenerating(true);
    try {
      await onConcernsSelected(selectedConcerns, budget, age);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <View style={styles.concernsSelectionContainer}>
      <BlurView intensity={15} style={styles.concernsSelectionCard}>
        <Text style={styles.concernsSelectionTitle}>Customize Your Routine</Text>
        <Text style={styles.concernsSelectionSubtitle}>
          Select your main skin concerns for personalized recommendations
        </Text>

        {/* Age Selection */}
        <View style={styles.ageSection}>
          <Text style={styles.sectionLabel}>Your Age</Text>
          <View style={styles.ageOptions}>
            {[20, 25, 30, 35, 40, 45, 50].map(ageOption => (
              <TouchableOpacity
                key={ageOption}
                style={[styles.ageOption, age === ageOption && styles.ageOptionSelected]}
                onPress={() => setAge(ageOption)}
              >
                <Text style={[styles.ageText, age === ageOption && styles.ageTextSelected]}>
                  {ageOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Budget Selection */}
        <View style={styles.budgetSection}>
          <Text style={styles.sectionLabel}>Budget Preference</Text>
          <View style={styles.budgetOptions}>
            {[
              { key: 'low', label: 'Budget (₹500-1000)' },
              { key: 'medium', label: 'Moderate (₹1000-3000)' },
              { key: 'high', label: 'Premium (₹3000+)' }
            ].map(budgetOption => (
              <TouchableOpacity
                key={budgetOption.key}
                style={[styles.budgetOption, budget === budgetOption.key && styles.budgetOptionSelected]}
                onPress={() => setBudget(budgetOption.key)}
              >
                <Text style={[styles.budgetText, budget === budgetOption.key && styles.budgetTextSelected]}>
                  {budgetOption.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Concerns Selection */}
        <View style={styles.concernsListSection}>
          <Text style={styles.sectionLabel}>Select Your Concerns</Text>
          <ScrollView style={styles.concernsScroll} showsVerticalScrollIndicator={false}>
            <View style={styles.concernsGrid}>
              {skincareConcerns.map(concern => (
                <TouchableOpacity
                  key={concern.id}
                  style={[
                    styles.concernItem,
                    selectedConcerns.includes(concern.id) && styles.concernItemSelected
                  ]}
                  onPress={() => toggleConcern(concern.id)}
                >
                  <BlurView intensity={selectedConcerns.includes(concern.id) ? 20 : 10} style={styles.concernBlur}>
                    <Text style={[
                      styles.concernName,
                      selectedConcerns.includes(concern.id) && styles.concernNameSelected
                    ]}>
                      {concern.name}
                    </Text>
                    <Text style={styles.concernDescription}>
                      {concern.description}
                    </Text>
                    {selectedConcerns.includes(concern.id) && (
                      <View style={styles.concernSelectedIndicator}>
                        <Check size={16} color="#fff" />
                      </View>
                    )}
                  </BlurView>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View style={styles.concernsActions}>
          <TouchableOpacity style={styles.concernsBackButton} onPress={onBack}>
            <Text style={styles.concernsBackButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.generateButton, selectedConcerns.length === 0 && styles.generateButtonDisabled]}
            onPress={handleGenerateRoutine}
            disabled={selectedConcerns.length === 0 || isGenerating}
          >
            <BlurView intensity={15} style={styles.generateButtonBlur}>
              <Text style={styles.generateButtonText}>
                {isGenerating ? 'Generating...' : 'Create Personalized Routine'}
              </Text>
            </BlurView>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
}