import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import MenuTop from './MenuTop';

const Header = () => {
  const router = useRouter();
  const segments = useSegments();

  // Détermine le titre en fonction du segment actuel
  // const getTitle = () => {
  //   const page = segments[segments.length - 1];
  //   switch (page) {
  //     case 'home':
  //       return 'Home';
  //     case 'login':
  //       return 'Login';
  //     default:
  //       return 'Page';
  //   }
  // };

  return (
    <>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{getTitle()}</Text>
      </View> */}
      <MenuTop />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#599AD0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'absolute',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 1,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Header;
