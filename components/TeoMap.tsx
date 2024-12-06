import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {WebView} from 'react-native-webview';

// Propriétés du composant map
interface TeoMapProps {
    htmlFilePath: string ;
}

const TeoMap: React.FC<TeoMapProps> = ({htmlFilePath}) => {
    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: htmlFilePath }}
                style={styles.map}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.error('WebView error: ', nativeEvent);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    container: {

        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TeoMap;
