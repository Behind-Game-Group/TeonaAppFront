import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';

const TravelConf = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.travelContainer}>
        <View style={styles.travelContainent}>
          <View style={styles.travelImageContainer}>
            <Image
              style={styles.travelImage}
              source={require('@/assets/images/settingpic.png')}
            />
          </View>
          <View style={styles.travelTextContainer}>
            <Text style={styles.travelText}>
              No travel companions yet, add one to make check-out easier.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  travelContainer: {
    flex: 1,
  },
  travelContainent: {
    flex: 1,
    width: '100%',
    backgroundColor: '#599AD0',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  travelImageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  travelImage: {
    alignContent: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  travelTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  travelText: {
    color: '#FFFFFF',
    fontSize: 30,
    maxWidth: '72%',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
  },
});

export default TravelConf;
