import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { Sun, Moon } from 'lucide-react-native';
import { styles } from './common/styles';

const morningRoutine = [
  { step: 'Cleanser', product: 'Gentle Foam Cleanser' },
  { step: 'Toner', product: 'Balancing Toner' },
  { step: 'Sunscreen', product: 'SPF 50 Sunscreen' }
];

const nightRoutine = [
  { step: 'Cleanser', product: 'Deep Clean Cleanser' },
  { step: 'Serum', product: 'Niacinamide Serum' },
  { step: 'Moisturizer', product: 'Night Moisturizer' }
];

export default function SkincareRoutine() {
  return (
    <View style={styles.routineSection}>
      <Text style={styles.sectionTitle}>Your Personalized Routine</Text>
      
      <View style={styles.routineCard}>
        <BlurView intensity={15} style={styles.routineBlur}>
          <View style={styles.routineHeader}>
            <Sun size={24} color="#F59E0B" />
            <Text style={styles.routineTitle}>Morning Routine</Text>
          </View>
          {morningRoutine.map((item, index) => (
            <View key={index} style={styles.routineStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepInfo}>
                <Text style={styles.stepName}>{item.step}</Text>
                <Text style={styles.productName}>{item.product}</Text>
              </View>
            </View>
          ))}
        </BlurView>
      </View>
      
      <View style={styles.routineCard}>
        <BlurView intensity={15} style={styles.routineBlur}>
          <View style={styles.routineHeader}>
            <Moon size={24} color="#6366F1" />
            <Text style={styles.routineTitle}>Night Routine</Text>
          </View>
          {nightRoutine.map((item, index) => (
            <View key={index} style={styles.routineStep}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stepInfo}>
                <Text style={styles.stepName}>{item.step}</Text>
                <Text style={styles.productName}>{item.product}</Text>
              </View>
            </View>
          ))}
        </BlurView>
      </View>
    </View>
  );
}