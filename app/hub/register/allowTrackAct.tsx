import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {ImageBackground, StyleSheet, Text, TouchableOpacity} from "react-native";
import TeoNotif from "@/components/TeoNotif/TeoNotif";

export default function allowTrackAct() {
    return (
        <SafeAreaProvider>
            <ImageBackground
                source={require('@/assets/images/teohuballow.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover">
                <SafeAreaView>
                    <TeoNotif>
                        <Text>
                            Allow "Teona Passenger" to track your activity across other companies' apps and websites?
                        </Text>
                        <Text>
                            By anonymously sharing your data, you will benefit from relevant partners. </Text>
                    <TouchableOpacity> Don't allow</TouchableOpacity>
                        <TouchableOpacity> Allow</TouchableOpacity>
                    </TeoNotif>
                </SafeAreaView>
            </ImageBackground>
        </SafeAreaProvider>
    )

};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})