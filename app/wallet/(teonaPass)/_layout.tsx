import {Stack} from 'expo-router';
import React from 'react';
import {View, StyleSheet, Image, Dimensions,Text} from 'react-native';

const {width,height} = Dimensions.get('window');
export default function LoginLayout() {
    return (
        <View style={styles.container}>
            {/* Contenu principal */}
            <View style={styles.content}>
                <Stack screenOptions={{headerShown: false}}/>
            </View>
            {/* Contenu principal */}
            <View style={styles.content}>
                <Stack screenOptions={{headerShown: false}}/>
            </View>
            <View style={styles.footer}>
                <View style={styles.rowImages}>
                    <Image
                        source={require('../../../assets/images/bus-logo.png')}
                        style={styles.logoBus}
                    />
                    <Image
                        source={require('../../../assets/images/bus-logo.png')}
                        style={styles.logoBus}
                    />
                    <Image
                        source={require('../../../assets/images/wallet-teona-logo.png')}
                        style={[styles.logo, {tintColor: '#606060'}]}
                    />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1
    },
    header: {
        height: height *0.3,
        width: '100%',
        backgroundColor: '#599AD0',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 70,
        width: '100%',
        backgroundColor: '#DF8D22',
    },
    rowImages: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 4,
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        tintColor: '#606060',
    },
    logoBus: {
        width: 65,
        height: 65,
        resizeMode: 'contain',
    },
});