import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import TeoNotif from "@/components/TeoNotif/TeoNotif";
import CustomButton from "@/components/ButtonInscriptionLogin";
import {View , Text} from "react-native";

export default function NotifAllow() {
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>
                    Turn on your notifications to stay up to date about your journey.
                </Text>
                <View>
                    <TeoNotif>
                        <Text>
                            "Teona Passenger" would like to send you notifications.
                        </Text>
                        <Text>
                            Notification may include alerts, sounds and icon badges. These can be configured in settings.
                        </Text>
                        <CustomButton text={"Don't Allow"} onPress={}/>
                        <CustomButton text={"Allow"} onPress={}/>
                    </TeoNotif>
                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    )
}