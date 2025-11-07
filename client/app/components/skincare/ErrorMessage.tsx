import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AlertCircle, RefreshCw } from 'lucide-react-native';
import { styles } from './common/styles';

interface ErrorMessageProps {
  title: string;
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export default function ErrorMessage({ 
  title, 
  message, 
  onRetry, 
  showRetry = false 
}: ErrorMessageProps) {
  return (
    <View style={styles.errorContainer}>
      <View style={styles.errorIcon}>
        <AlertCircle size={24} color="#EF4444" />
      </View>
      
      <Text style={styles.errorTitle}>{title}</Text>
      <Text style={styles.errorMessage}>{message}</Text>
      
      {showRetry && onRetry && (
        <View style={{ marginTop: 16 }}>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={onRetry}
          >
            <View style={styles.loadingContainer}>
              <RefreshCw size={16} color="#6366F1" />
              <Text style={styles.secondaryButtonText}>Try Again</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
