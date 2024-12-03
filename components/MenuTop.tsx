import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter, RelativePathString, ExternalPathString } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

type MenuTopProps = {
  text: string;
  onPress?: RelativePathString | ExternalPathString;
};

const MenuTop: React.FC<MenuTopProps> = ({ text, onPress }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <>
    <StatusBar style={"light"} backgroundColor="#599AD0" />
      <View style={[styles.header]}>
        <TouchableOpacity
            style={[styles.viewEnd]}
          onPress={() => {
            // Validation du chemin
            if (onPress) {
              try {
                router.push(onPress); // Naviguer vers une route valide
              } catch (error) {
                console.log(`Navigation error: ${error}`);
              }
            } else {
              router.back(); // Retour si onPress est vide
            }
          }}
        >
          <Image
            source={require('@/assets/images/chevron-bottom-normal.png')}
            style={styles.image}
          /> {/* Bouton retour */}
        </TouchableOpacity>
        <View style={[styles.viewCenter]}>
            <Text style={styles.title}>{text}</Text> {/* Titre */}
        </View>
        <TouchableOpacity
            style={[styles.viewStart]} 
            onPress={() => setShowMenu(!showMenu)}>
          <Text style={styles.menu}>☰</Text> {/* Menu Burger */}
        </TouchableOpacity>
      </View>

      {/* Contenu principal */}
      <View style={styles.content}>
        <Text>Contenu principal de l'application.</Text>
      </View>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#599AD0',
    height: 140,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  viewEnd: { 
    alignItems: 'center', 
    justifyContent : 'flex-end', 
    height: '100%',
    width: 40,
    },
 viewCenter: {
    height: '100%',
    backgroundColor: 'green',
    justifyContent: 'center'
  },
 viewStart: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '60%',
    width: 40
  },
  back: {
    color: '#fff',
    fontSize: 18,
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default MenuTop;
