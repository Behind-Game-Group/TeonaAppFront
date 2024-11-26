import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {ImageBackground, StyleSheet, Text, TouchableOpacity} from "react-native";
import TeoNotif from "@/components/TeoNotif/TeoNotif";
import {router} from "expo-router";

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
                    <TouchableOpacity onPress={() => router.push('/hub/beginInscription')}>
                        <Text> Don't Allow</Text>
                    </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/hub/beginInscription')}>
                            <Text>Allow</Text>
                        </TouchableOpacity>
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