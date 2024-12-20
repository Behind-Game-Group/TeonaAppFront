import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface TeonaPassNavProps {
  title: string;
}

const TeonaPassNav: React.FC<TeonaPassNavProps> = ({ title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isMobile: boolean = width < 768;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {isMobile ? (
        <TouchableOpacity onPress={toggleMenu} style={styles.burgerMenu}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={styles.menu}>
          <Text style={styles.menuItem}>Home</Text>
          <Text style={styles.menuItem}>About</Text>
          <Text style={styles.menuItem}>Contact</Text>
        </View>
      )}
      {isMenuOpen && isMobile && (
        <View style={styles.dropdownMenu}>
          <Text style={styles.menuItem}>Home</Text>
          <Text style={styles.menuItem}>About</Text>
          <Text style={styles.menuItem}>Contact</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#599AD0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  burgerMenu: {
    padding: 10,
  },
  menu: {
    flexDirection: 'row',
  },
  menuItem: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
});

export default TeonaPassNav;
