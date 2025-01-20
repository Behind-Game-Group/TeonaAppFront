import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function allowTrackAct() {
  // Fonction pour gérer la navigation conditionnelle
  const handleNavigation = (route: string) => {
    const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';
    const targetRoute = isMobile ? '/hub/(register)/AllowLocation' : route;
    router.push(targetRoute as any);
  };

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('@/assets/images/allowtrackact.png')}
        style={styles.backgroundImage}
      >
        <SafeAreaView>
          <Text style={styles.trackActiTitle}>
            Allow "Teona Passenger" to track your activity across other
            companies' apps and websites?{'\n'}
          </Text>
          <Text style={styles.trackActiText}>
            By anonymously sharing your data, you will benefit from relevant
            partners. {'\n'}
          </Text>
          <View style={styles.trackActiButton}>
            <TouchableOpacity
              onPress={() => handleNavigation('/home')}
            >
              <Text>Don't Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation('/home')}
            >
              <Text>Allow</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    resizeMode: 'contain',
  },
  trackActiText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
  },
  trackActiTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  trackActiButton: {
    flexDirection: 'row',
    padding: 10,
    color: '#4387AA',
    fontWeight: 'bold',
  },
});
