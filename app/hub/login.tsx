import React from 'react';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';
export default function Login() {
  return (
    <View>
      <Text>
        {' '}
        <Link href={'/hub/(login)/Login'}>Login Screen</Link>
      </Text>
    </View>
  );
}
