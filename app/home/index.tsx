import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ExternalPathString, RelativePathString, useRouter } from 'expo-router';

// Définir les type des données
interface IconData {
  id: number;
  image: any;
  route: RelativePathString | ExternalPathString;
}

const Home: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  // Tableau des données pour chaque Service
  const iconsData: IconData[] = [
    {
      id: 1,
      image: require('@/assets/images/SkyService.png'),
      route: '/sky/sky' as RelativePathString,
    },
    {
      id: 2,
      image: require('@/assets/images/BusService.png'),
      route: '/bus' as RelativePathString,
    },
    {
      id: 3,
      image: require('@/assets/images/CruiserService.png'),
      route: '/cruiser/cruiser' as RelativePathString,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <ImageBackground
        source={require('@/assets/images/bgTeonaService.png')}
        style={[styles.backgroundImage, { width, height }]}
        resizeMode='cover'
      >
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={[styles.imageWrapper, styles.whiteBackground]}
            onPress={() => router.push('/wallet/wallet')}
          >
            <Image
              source={require('@/assets/images/TeonaWalletIcon.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          {iconsData.map((icon) => (
            <View key={icon.id} style={styles.itemContainer}>
              <TouchableOpacity
                style={[styles.iconWrapper, styles.whiteBackground]}
                onPress={() => router.push(icon.route)}
              >
                <Image
                  source={icon.image}
                  style={styles.icon}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  imageWrapper: {
    marginBottom: 20,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  itemContainer: {
    width: '80%',
    marginVertical: '15%',
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white',
    padding: 25,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  icon: {
    width: 280,
    height: 80,
  },
  whiteBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default Home;
