import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

type MenuTopProps = {
  text: string;
  onPress?: string; // Route de navigation
};

const MenuTop: React.FC<MenuTopProps> = ({ text, onPress }) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <StatusBar style="light" backgroundColor="#599AD0" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.viewEnd}
          onPress={() => {
            if (onPress) {
              try {
                router.push(onPress); // Naviguer vers une route valide
              } catch (error) {
                console.error(`Navigation error: ${error}`);
              }
            } else {
              router.back(); // Retour si onPress est vide
            }
          }}
        >
          <Image
            source={require('@/assets/images/chevron-bottom-normal.png')}
            style={styles.image}
          />
        </TouchableOpacity>

        <View style={styles.viewCenter}>
          <Text style={styles.title}>{text}</Text>
        </View>

        <TouchableOpacity style={styles.viewStart} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modal}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Text>✖</Text>
          </TouchableOpacity>
          <Text>Contenu principal de l'application.</Text>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#599AD0',
    height: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  viewEnd: { 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    height: '100%',
    width: 40,
  },
  viewCenter: {
    justifyContent: 'center',
  },
  viewStart: { 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    height: '100%',
    width: 40,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  menu: {
    color: '#fff',
    fontSize: 24,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
});

export default MenuTop;
