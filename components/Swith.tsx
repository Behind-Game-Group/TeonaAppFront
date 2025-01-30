import { View, StyleSheet, Pressable, Switch } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';

type CustomProps = {
  res: Dispatch<SetStateAction<boolean>>;
};

const ToggleSwitchCompo: React.FC<CustomProps> = ({ res }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    res(isEnabled);
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: '#767577', true: '#46D357' }}
        thumbColor={isEnabled ? '#ffffff' : '#ffffff'} // Blanc pour les deux états bug
        ios_backgroundColor='#3e3e3e'
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      {isEnabled && (
        <Pressable
          onPress={toggleSwitch}
          style={{
            width: 20,
            height: 20,
            backgroundColor: '#fff',
            borderRadius: 15,
            right: 20,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ToggleSwitchCompo;
