import {Alert,Button, Text, ImageBackground,StyleSheet} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

export default function AllowNotif() {

    return (
        <SafeAreaProvider style={styles.allContainer}>
            <ImageBackground
                source={require('@/assets/images/allowcontainer1.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
            <SafeAreaView style={styles.allContent}>

                <div >
                    <Text style={styles.titleAll}> Turn on your notifications to stay up to date about your
                        journey.</Text>
                    <Text style={styles.optTitleAll}> We'll automatically send you information about your journey in real time . </Text>
                </div>
                <div>
                   Alert.alert("Turn on notifications")
                </div>

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
    }

});