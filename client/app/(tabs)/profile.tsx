import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { User, CreditCard as Edit, Clock, Settings, Heart, Bell } from 'lucide-react-native';

export default function ProfileScreen() {
  const userInfo = {
    name: 'Jaimin Detroja',
    age: 20,
    gender: 'Male',
    skinType: 'Oily',
    faceShape: 'Oval'
  };

  const savedRecommendations = [
    {
      id: 1,
      type: 'Hairstyle',
      name: 'Layered Cut',
      date: '2 days ago'
    },
    {
      id: 2,
      type: 'Skincare',
      name: 'Oily Skin Routine',
      date: '1 week ago'
    },
    {
      id: 3,
      type: 'Hairstyle',
      name: 'Pompadour',
      date: '2 weeks ago'
    }
  ];

  const profileSections = [
    { icon: Settings, title: 'Account Settings', subtitle: 'Privacy, security, and preferences' },
    { icon: Bell, title: 'Notifications', subtitle: 'Manage your notification preferences' },
    { icon: Heart, title: 'Favorites', subtitle: 'View your saved styles and products' },
    { icon: Clock, title: 'History', subtitle: 'See your past analyses and recommendations' }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <LinearGradient
        colors={['#f0f9ff', '#fef7ff', '#ffffff']}
        style={styles.background}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profile</Text>
        
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <BlurView intensity={15} style={styles.profileCard}>
            <View style={styles.avatarSection}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                style={styles.avatar}
              >
                <User size={32} color="#fff" />
              </LinearGradient>
              <TouchableOpacity style={styles.editButton}>
                <Edit size={16} color="#6366F1" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userInfo.name}</Text>
              <Text style={styles.userSubtitle}>Premium Member</Text>
              
              <View style={styles.userDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Age:</Text>
                  <Text style={styles.detailValue}>{userInfo.age}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Gender:</Text>
                  <Text style={styles.detailValue}>{userInfo.gender}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Skin Type:</Text>
                  <Text style={styles.detailValue}>{userInfo.skinType}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Face Shape:</Text>
                  <Text style={styles.detailValue}>{userInfo.faceShape}</Text>
                </View>
              </View>
            </View>
          </BlurView>
        </View>
        
        {/* Recent Recommendations */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Recent Recommendations</Text>
          
          {savedRecommendations.map((item) => (
            <TouchableOpacity key={item.id} style={styles.recommendationCard}>
              <BlurView intensity={10} style={styles.recommendationBlur}>
                <View style={styles.recommendationInfo}>
                  <Text style={styles.recommendationType}>{item.type}</Text>
                  <Text style={styles.recommendationName}>{item.name}</Text>
                  <Text style={styles.recommendationDate}>{item.date}</Text>
                </View>
                <View style={styles.typeIcon}>
                  {item.type === 'Hairstyle' ? (
                    <View style={styles.iconContainer}>
                      <Text style={styles.iconText}>✂️</Text>
                    </View>
                  ) : (
                    <View style={styles.iconContainer}>
                      <Text style={styles.iconText}>✨</Text>
                    </View>
                  )}
                </View>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Profile Sections */}
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionTitle}>More</Text>
          
          {profileSections.map((section, index) => (
            <TouchableOpacity key={index} style={styles.sectionCard}>
              <BlurView intensity={10} style={styles.sectionBlur}>
                <View style={styles.sectionIcon}>
                  <section.icon size={24} color="#6366F1" />
                </View>
                <View style={styles.sectionInfo}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
                </View>
              </BlurView>
            </TouchableOpacity>
          ))}
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
  profileHeader: {
    marginBottom: 32,
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 24,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  editButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
    marginBottom: 16,
  },
  userDetails: {
    width: '100%',
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  recommendationsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  recommendationCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  recommendationBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationInfo: {
    flex: 1,
  },
  recommendationType: {
    fontSize: 12,
    color: '#6366F1',
    fontWeight: '600',
    marginBottom: 2,
  },
  recommendationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  recommendationDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  typeIcon: {
    marginLeft: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  sectionsContainer: {
    marginBottom: 32,
  },
  sectionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  sectionBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sectionInfo: {
    flex: 1,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  bottomPadding: {
    height: 120,
  },
});