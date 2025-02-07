import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Modal,
  Button,
  Text,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface IdButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: object;
  color?: '#FFA500' | '#FFFFFF';
  backgroundColor?: '#FFA500' | '#FFFFFF';
  iconSource?: object;
  onImageSelected: (uri: string) => void;
}

const IdButton: React.FC<IdButtonProps> = ({
  title,
  onPress,
  style,
  color = '#FFA500',
  backgroundColor = '#FFFFFF',
  iconSource,
  onImageSelected,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      onImageSelected(result.uri);
    }
    setModalVisible(false);
  };

  const handleLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      onImageSelected(result.uri);
    }
    setModalVisible(false);
  };

  const handleFileInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        onImageSelected(fileUrl);
      }
    };
    input.click();
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={[styles.button, style]} onPress={handlePress}>
        <View style={styles.content}>
          {iconSource && <Image source={iconSource} style={styles.icon} />}
          <Text style={[styles.text, { color }]}>{title}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Choose an option</Text>
            {Platform.OS === 'web' ? (
              <Button title='Upload File' onPress={handleFileInput} />
            ) : (
              <>
                <Button title='Camera' onPress={handleCamera} />
                <Button title='Photo Library' onPress={handleLibrary} />
              </>
            )}
            <Button title='Close' onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default IdButton;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '70%',
    borderWidth: 2,
  },
  orangeButton: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  whiteButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFA500',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  orangeText: {
    color: '#FFFFFF',
  },
  whiteText: {
    color: '#FFA500',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  icon: {
    width: 20,
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
