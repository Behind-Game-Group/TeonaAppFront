import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  GestureResponderEvent,
} from 'react-native';
import { useState } from 'react';

interface elementTab {
  title: string;
  nb: number;
}

type CustomProps = {
  data?: string;
  onPress: (event: GestureResponderEvent) => void;
};
const PassagerBike: React.FC<CustomProps> = ({ data, onPress }) => {
  const [ref, setRef] = useState<number[]>([0, 0, 0]);
  const [elements] = useState<elementTab[]>([
    { title: 'Adulte', nb: 0 },
    { title: 'Child', nb: 0 },
    { title: 'Bike', nb: 0 },
  ]);

  function setE() {
    elements.map((e) => {
      if (e.nb < 0) {
        e.nb = 0;
      }
    });
    setRef([elements[0].nb, elements[1].nb, elements[2].nb]);
  }

  return (
    <>
      <SafeAreaView style={styles.modal}>
        <View style={styles.bar}></View>
        <Text style={styles.title}>
          PASSANGER/BIKES
          <TouchableOpacity onPress={onPress} style={styles.back}>
            X
          </TouchableOpacity>
        </Text>

        {/* <Text style={styles.gilet}>{'<  >'}</Text> */}
        {elements.map((elem, index) => {
          return (
            <View key={index} style={styles.container}>
              <View>
                <Text style={styles.var}>{elem.title}</Text>
              </View>

              <View
                style={{
                  position: 'absolute',
                  right: 50,
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    elem.nb--;
                    setE();
                  }}
                ></TouchableOpacity>
                <View>
                  <Text style={styles.var}>{ref[index]}</Text>
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    elem.nb++;
                    setE();
                  }}
                ></TouchableOpacity>
              </View>
            </View>
          );
        })}
        <Text> </Text>
      </SafeAreaView>
    </>
  );
};
export default PassagerBike;
const styles = StyleSheet.create({
  obj: {},
  btn: {
    backgroundColor: '#888',
    height: 20,
    width: 20,
    margin: 9,
    paddingLeft: 6,
    borderRadius: 3,
  },
  // gilet: { fontSize: 40, position: 'absolute', right: '5%', top: 20 },
  bar: {
    alignSelf: 'center',
    backgroundColor: '#F88F04',
    width: 150,
    borderRadius: 15,
    height: 6,
    marginTop: 15,
  },
  container: {
    padding: 15,
    alignContent: 'center',
    margin: 15,
    flexDirection: 'row',
  },
  back: {
    position: 'absolute',
    right: 30,
    bottom: 18,
    width: 30,
    height: 32,
    borderRadius: 50,

    fontSize: 25,
    alignItems: 'center',
    verticalAlign: 'middle',

    color: '#eee',
    backgroundColor: '#aaa',
  },
  var: { fontSize: 24, marginBottom: 7 },
  title: { color: '#F88F04', width: '100%', marginLeft: 15, fontSize: 30 },
  modal: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    height: 400,
    borderColor: '#679C70',
  },
});
