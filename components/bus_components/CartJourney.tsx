import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

interface responceBus {
  resDateStart: string;
  resDateEnd: string;
  prices: string;
  detail?: string;
}
type res = { data: responceBus };
const CartJourney: React.FC<res> = ({ data }) => {
  //Définition des types des données reçus  par l'api afin de l'afficher a l'utilisateur

  const width = 280;
  return (
    <View style={{ width: width }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            paddingLeft: 4,
            gap: '16%',
            paddingBottom: 8,
            margin: 15,
          }}
        >
          <Text>{data.resDateStart}</Text>
          <Text style={{ width: 100 }}>
            Journey <br />5 h 40mins
          </Text>
          <Text>{data.resDateEnd}</Text>
        </TouchableOpacity>{' '}
        <button
          style={{
            borderWidth: 1,
            margin: 10,
            borderRadius: 4,
            height: 30,
            width: 170,
            top: 20,
            color: '#555',
            flexDirection: 'row',
            backgroundColor: 'green',
          }}
        >
          <Image
            style={{ height: 30, width: 30 }}
            resizeMode='contain'
            source={require('@/assets/images/bus-logo.png')}
          />
          <Text style={{ bottom: 26, left: 3 }}>Journey details {'>'}</Text>
        </button>
        <TouchableOpacity
          style={[
            { margin: 5, width: 150 },
            width >= 270 && { flexDirection: 'row' },
          ]}
        >
          <Image
            style={{ height: 50, width: 190 }}
            resizeMode='repeat'
            source={require('@/assets/images/Travel.png')}
          />
          <Text
            style={{
              color: 'orange',
              paddingLeft: 10,
              margin: 5,
              fontSize: 20,
              alignContent: 'flex-end',
            }}
          >
            {data.prices}
          </Text>
        </TouchableOpacity>
      </View>{' '}
    </View>
  );
};
const styles = StyleSheet.create({
  btn: { backgroundColor: 'orange' },
  container: { borderWidth: 2 },
});
export default CartJourney;
