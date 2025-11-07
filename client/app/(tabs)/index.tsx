import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Scissors, Sparkles, User, Clock, BookOpen, ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Background */}
      <LinearGradient
        colors={['#ffeef8', '#f0f9ff', '#ffffff']}
        style={styles.background}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hi, Jaimin 👋</Text>
          <Text style={styles.subtitle}>Ready to glow up today?</Text>
        </View>
        
        {/* Main Cards */}
        <View style={styles.mainCards}>
          <TouchableOpacity 
            style={styles.mainCard}
            onPress={() => router.push('/(tabs)/hairstyle')}
          >
            <BlurView intensity={20} style={styles.cardBlur}>
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.1)', 'rgba(139, 92, 246, 0.05)']}
                style={styles.cardGradient}
              >
                <View style={styles.cardIcon}>
                  <Scissors size={28} color="#8B5CF6" />
                </View>
                <Text style={styles.cardTitle}>Hairstyle Analysis</Text>
                <Text style={styles.cardDescription}>Discover the perfect hairstyle for your face shape</Text>
                <ChevronRight size={20} color="#8B5CF6" style={styles.cardArrow} />
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.mainCard}
            onPress={() => router.push('/(tabs)/skincare')}
          >
            <BlurView intensity={20} style={styles.cardBlur}>
              <LinearGradient
                colors={['rgba(236, 72, 153, 0.1)', 'rgba(236, 72, 153, 0.05)']}
                style={styles.cardGradient}
              >
                <View style={styles.cardIcon}>
                  <Sparkles size={28} color="#EC4899" />
                </View>
                <Text style={styles.cardTitle}>Skincare Analysis</Text>
                <Text style={styles.cardDescription}>Get personalized skincare routine recommendations</Text>
                <ChevronRight size={20} color="#EC4899" style={styles.cardArrow} />
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>
        </View>
        
        {/* Quick Access */}
        <View style={styles.quickAccess}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickAccessRow}>
            <TouchableOpacity 
              style={styles.quickAccessCard}
              onPress={() => router.push('/(tabs)/profile')}
            >
              <BlurView intensity={15} style={styles.quickAccessBlur}>
                <User size={24} color="#6366F1" />
                <Text style={styles.quickAccessText}>My Profile</Text>
              </BlurView>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAccessCard}>
              <BlurView intensity={15} style={styles.quickAccessBlur}>
                <Clock size={24} color="#10B981" />
                <Text style={styles.quickAccessText}>History</Text>
              </BlurView>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAccessCard}>
              <BlurView intensity={15} style={styles.quickAccessBlur}>
                <BookOpen size={24} color="#F59E0B" />
                <Text style={styles.quickAccessText}>Tips & Blogs</Text>
              </BlurView>
            </TouchableOpacity>
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
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  mainCards: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 40,
  },
  mainCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  cardGradient: {
    padding: 24,
    minHeight: 140,
    justifyContent: 'space-between',
    position: 'relative',
  },
  cardIcon: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  cardArrow: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  quickAccess: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  quickAccessRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAccessCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickAccessBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  quickAccessText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 120,
  },
});