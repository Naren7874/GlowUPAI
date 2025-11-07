import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Camera, Upload, CircleCheck as CheckCircle, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HairstyleScreen() {
  const dummyHairstyles = [
    {
      id: 1,
      name: 'Layered Cut',
      image: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      rating: 4.8,
      description: 'Perfect for adding volume and movement'
    },
    {
      id: 2,
      name: 'Pompadour',
      image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      rating: 4.6,
      description: 'Classic and sophisticated look'
    },
    {
      id: 3,
      name: 'Side Swept',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      rating: 4.7,
      description: 'Versatile and professional'
    },
    {
      id: 4,
      name: 'Textured Crop',
      image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      rating: 4.5,
      description: 'Modern and trendy style'
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <LinearGradient
        colors={['#fef3ff', '#f0f9ff', '#ffffff']}
        style={styles.background}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Hairstyle Analysis</Text>
        
        {/* Upload Section */}
        <View style={styles.uploadSection}>
          <BlurView intensity={20} style={styles.uploadCard}>
            <Text style={styles.uploadTitle}>Upload Your Photo</Text>
            <Text style={styles.uploadSubtitle}>Take a photo or upload from gallery</Text>
            
            <View style={styles.uploadButtons}>
              <TouchableOpacity style={styles.uploadButton}>
                <LinearGradient
                  colors={['#8B5CF6', '#A855F7']}
                  style={styles.buttonGradient}
                >
                  <Camera size={24} color="#fff" />
                  <Text style={styles.buttonText}>Take Photo</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.uploadButton}>
                <BlurView intensity={15} style={styles.secondaryButton}>
                  <Upload size={24} color="#8B5CF6" />
                  <Text style={styles.secondaryButtonText}>Upload</Text>
                </BlurView>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
        
        {/* Analysis Result */}
        <View style={styles.analysisSection}>
          <BlurView intensity={15} style={styles.analysisCard}>
            <View style={styles.analysisHeader}>
              <View style={styles.faceImageContainer}>
                <Image 
                  source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' }}
                  style={styles.faceImage}
                />
                <View style={styles.statusBadge}>
                  <CheckCircle size={16} color="#10B981" />
                  <Text style={styles.statusText}>Analyzed</Text>
                </View>
              </View>
              <View style={styles.analysisInfo}>
                <Text style={styles.detectedLabel}>Detected Face Shape</Text>
                <Text style={styles.detectedValue}>Oval</Text>
                <Text style={styles.confidenceText}>95% confidence</Text>
              </View>
            </View>
          </BlurView>
        </View>
        
        {/* Suggested Hairstyles */}
        <View style={styles.suggestionsSection}>
          <Text style={styles.sectionTitle}>Suggested Hairstyles</Text>
          <Text style={styles.sectionSubtitle}>Perfect matches for your oval face shape</Text>
          
          <View style={styles.hairstylesGrid}>
            {dummyHairstyles.map((style) => (
              <TouchableOpacity key={style.id} style={styles.hairstyleCard}>
                <BlurView intensity={15} style={styles.hairstyleBlur}>
                  <Image source={{ uri: style.image }} style={styles.hairstyleImage} />
                  <View style={styles.hairstyleInfo}>
                    <Text style={styles.hairstyleName}>{style.name}</Text>
                    <Text style={styles.hairstyleDescription}>{style.description}</Text>
                    <View style={styles.ratingContainer}>
                      <Star size={14} color="#FBBF24" fill="#FBBF24" />
                      <Text style={styles.ratingText}>{style.rating}</Text>
                    </View>
                  </View>
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.bottomPadding} />
      </ScrollView>
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
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 24,
  },
  uploadSection: {
    marginBottom: 24,
  },
  uploadCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  uploadButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  uploadButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  analysisSection: {
    marginBottom: 24,
  },
  analysisCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 20,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  faceImageContainer: {
    position: 'relative',
  },
  faceImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statusBadge: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  analysisInfo: {
    flex: 1,
  },
  detectedLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  detectedValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  confidenceText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
  suggestionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  hairstylesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  hairstyleCard: {
    width: (width - 60) / 2,
    borderRadius: 16,
    overflow: 'hidden',
  },
  hairstyleBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 12,
  },
  hairstyleImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  hairstyleInfo: {
    gap: 4,
  },
  hairstyleName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  hairstyleDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: '600',
  },
  bottomPadding: {
    height: 120,
  },
});