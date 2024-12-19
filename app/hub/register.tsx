import React from 'react';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
export default function Register() {
  return (
    <View>
      <Text>
        {' '}
        <Link href={'/hub/(register)/BeginInscription'}>Register Screen</Link>
      </Text>
    </View>
  );
}
