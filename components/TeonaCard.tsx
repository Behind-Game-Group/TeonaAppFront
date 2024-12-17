import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import TopUpButton from './TopUpButton';
import { TeonaCardModel } from '@/components/TeonaCardModel';

interface TeonaCardProps {
  card: TeonaCardModel;
  onTopUp: (cardType: TeonaCardModel) => void;
}
const { width, height } = Dimensions.get('window');
const TeonaCard: React.FC<TeonaCardProps> = ({ card, onTopUp }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={card.image} />
      <Text style={styles.texte}>{`${card.title} ${card.price} €`}</Text>
      <View style={styles.buttonContainer}>
        <TopUpButton title='TopUp' onPress={() => onTopUp(card)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.8,
    paddingLeft: 0,
  },
  image: {
    width: width * 0.2,
    height: height * 0.2,
    resizeMode: 'contain',
  },
  texte: {
    fontSize: 18,
    flexDirection: 'row',
    textAlign: 'center',

    flexWrap: 'wrap',
    width: width * 0.5,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default TeonaCard;
