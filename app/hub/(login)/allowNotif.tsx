import {Alert,Button, Text, ImageBackground,StyleSheet,View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import TeoNotif from "@/components/TeoNotif/TeoNotif";

export default function AllowNotif() {

    return (
        <SafeAreaProvider style={styles.allContainer}>
            <ImageBackground
                source={require('../../assets/images/pexels-katerina-holmes-5911138.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.allContent}>

                    <View style={styles.notifContainer}>
                        <Text style={styles.titleAll}> Turn on your notifications to stay up to date about your
                            journey.</Text>
                        <Text style={styles.optTitleAll}> We'll automatically send you information about your journey in real time . </Text>
                    </View>
                    <View style={styles.notifAllow}>
                        <TeoNotif>
                            <Text>
                                <h4>Real-time updates</h4>
                            </Text>
                        </TeoNotif>

                    </View>
                </SafeAreaView>
            </ImageBackground>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({

    backgroundImage: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    allContainer: {

    },
    allContent: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    titleAll: {
        color: "black",
    },
    optTitleAll: {
        color: "blue",
    },
    notifContainer: {
        backgroundColor: "#fff",
    },
    notifAllow: {
        backgroundColor: "#fff",
    }

});