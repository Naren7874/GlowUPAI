import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { Sparkles } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />
      
      {/* Content Container */}
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#ffeaa7', '#fab1a0']}
              style={styles.logoGradient}
            >
              <Sparkles size={50} color="#fff" />
            </LinearGradient>
          </View>
          <Text style={styles.appName}>GlowUp</Text>
          <Text style={styles.tagline}>Your Personal Grooming & Lifestyle Coach</Text>
        </View>
        
        {/* Buttons Section */}
        <View style={styles.buttonsSection}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.replace('/(tabs)')}
          >
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.buttonGradient}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.replace('/(tabs)')}
          >
            <BlurView intensity={20} style={styles.blurButton}>
              <Text style={styles.secondaryButtonText}>Login</Text>
            </BlurView>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 100,
    paddingBottom: 80,
  },
  logoSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  appName: {
    fontSize: 42,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
  buttonsSection: {
    gap: 16,
  },
  primaryButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  blurButton: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});