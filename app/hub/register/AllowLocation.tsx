import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

import {Dimensions, ImageBackground, StyleSheet,  View, Text} from "react-native";
import TeoNotif from "@/components/TeoNotif/TeoNotif";
import TeoMap from "@/components/TeoMap";
const htmlFilePath = require('@/assets/teona-map.html');
const {width, height} = Dimensions.get('window');
export default function AllowLocation() {
    return (
        <SafeAreaProvider>
            <ImageBackground

                source={require('@/assets/images/allowlocation.png')}
                style={styles.backgroundImage}>


                <SafeAreaView style={styles.container}>
                    <TeoNotif>

                        <Text style={styles.allowTitle}>

                            And lastly… {'\n'} {'\n'}Allow “TeonaPass” to use your location {'\n'}{'\n'}</Text>


                        <Text style={styles.allowText}>
                            Your location will be displayed on the map and will be used in order to provide itineraries,
                            travel time estimates and easy proximity searches. {'\n'}{'\n'} </Text>

                        <View style={styles.allowMapContainer}>
                            <TeoMap

                                htmlFilePath={htmlFilePath}
                            />
                        </View>

                    </TeoNotif>
                </SafeAreaView>
            </ImageBackground>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    allowTitle: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    allowText: {
        textAlign: 'center',
        fontSize: 12,
        color: 'black',
    },
    buttonlocation: {
        color: '#4387AA',
        fontWeight: 'bold',
        justifyContent: 'flex-end',
        alignContent: 'space-around',
        alignItems: 'center',

    },
    allowMap: {
        width: width * 0.6,
        height: height * 0.3,
        borderRadius: 15,
    },
    allowMapContainer:{
    borderWidth: 1,
    }
});