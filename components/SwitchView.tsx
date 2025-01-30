import { Dispatch, SetStateAction } from 'react';
import ToggleSwitchCompo from './Swith';
import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';

type CustomProps = {
  title: string;
  sub?: string;
  setStrate: Dispatch<SetStateAction<boolean>>;
};

const NotifCompo: React.FC<CustomProps> = ({ title, sub, setStrate }) => {
  return (
    <View style={[styles.oni, !sub ? styles.cookie : {}]}>
      <View style={{ width: '90%' }}>
        {' '}
        <Text style={{ fontSize: 20 }}>{title}</Text>
        {sub ? (
          <Text style={styles.text}>{sub}</Text>
        ) : (
          <Link style={[styles.text, styles.italique]} href={'/settings/modal'}>
            More information
          </Link>
        )}
      </View>
      <View style={styles.toogle}>
        <ToggleSwitchCompo res={setStrate} />
      </View>
    </View>
  );
}; //
export default NotifCompo;
const styles = StyleSheet.create({
  italique: { color: 'green' },
  toogle: { flexDirection: 'row', alignSelf: 'center' },
  text: { fontSize: 12, padding: 5 },
  oni: {
    backgroundColor: '#EEE',
    borderBottomColor: '#777777',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'baseline',
    width: '100%',
    paddingRight: '5%',
  },
  cookie: {
    borderBottomWidth: 2,
  },
});
