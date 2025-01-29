import { View, Text, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function ContactUs(params: any) {
  const router = useRouter();
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: '#599AD0',
        alignItems: 'center',
      }}
    >
      <Pressable
        onPress={() => {
          router.push('/');
        }}
      >
        <Image
          style={{ height: 300 }}
          resizeMode='center'
          source={require('@/assets/images/Travel.png')}
        ></Image>
      </Pressable>

      <Text
        style={{
          textAlign: 'center',
          fontSize: 22,
          color: '#FFF',
          width: '50%',
        }}
      >
        No travel companions tes, add one to make check-out easier.
      </Text>
    </View>
  );
}
