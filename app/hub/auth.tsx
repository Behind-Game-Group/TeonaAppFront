import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/ButtonInscriptionLogin';

const StartScreen: React.FC = () => {
    const router = useRouter();
    const { width, height } = useWindowDimensions();

    const handleSignUp = () => {
        router.push('/hub/(register)/notifPage');
    };

    return (
      <View style={styles.container}>
          <ImageBackground
            source={require('@/assets/images/bgImgSign.png')}
            style={[styles.backgroundImage, { width, height }]}
            resizeMode="cover"
          >
              <View style={styles.content}>
                  <Text style={[styles.title, { fontSize: height * 0.035 }]}>
                      Welcome Passenger!
                  </Text>
              </View>

              <View style={[styles.buttonsContainer, { marginBottom: height * 0.08 }]}>
                  <CustomButton
                    text="Sign Up"
                    color="blue"
                    onPress={handleSignUp}
                  />
                  <CustomButton
                    text="Sign In"
                    color="white"
                    onPress={() => router.push('/hub/(login)/Login')}
                  />
              </View>
          </ImageBackground>
      </View>
    );
};

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
