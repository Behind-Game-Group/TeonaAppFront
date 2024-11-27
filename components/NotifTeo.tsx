import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

{/*Types d'options pour iOS*/}
export interface IosNotificationOptions {
    allowAlert: boolean;
    allowBadge: boolean;
    allowSound: boolean;
    allowAnnouncements?: boolean;
}

{/*Configuration pour Android */}
export interface AndroidNotificationChannel {
    id: string;
    name: string;
    importance: Notifications.AndroidImportance;
    sound?: string;
    vibrationPattern?: number[]; //  vibration, ex. [0, 250, 250, 500]
    enableVibrate?: boolean;
}

{/*Configuration globale des notifications */}
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

{/*Initialisation des notifications */}
export async function initializeNotifications(
    iosOptions: IosNotificationOptions = {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
    },
    androidChannel: AndroidNotificationChannel = {
        id: 'default',
        name: 'Default Channel',
        importance: Notifications.AndroidImportance.DEFAULT,
        sound: undefined,
        enableVibrate: true,
    }
): Promise<string | null> {
    if (!Device.isDevice) {
        console.log('Les notifications push ne fonctionnent que sur un appareil physique.');
        return null;
    }

    {/*Configuration des autorisations iOS*/}
    if (Platform.OS === 'ios') {
        let { status: existingStatus } = await Notifications.getPermissionsAsync();
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: iosOptions.allowAlert,
                    allowBadge: iosOptions.allowBadge,
                    allowSound: iosOptions.allowSound,
                    allowAnnouncements: iosOptions.allowAnnouncements,
                },
            });
            existingStatus = status;
        }

        if (existingStatus !== 'granted') {
            console.log('Permission pour les notifications refusée.');
            return null;
        }
    }

    {/*Configuration des canaux Android*/}
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync(androidChannel.id, {
            name: androidChannel.name,
            importance: androidChannel.importance,
            sound: androidChannel.sound,
            vibrationPattern: androidChannel.vibrationPattern,
            enableVibrate: androidChannel.enableVibrate ?? true,
        });
    }


    {/* Obtenir le token Expo Push*/}
    try {
        const tokenData = await Notifications.getExpoPushTokenAsync();
        console.log('Token Expo Push:', tokenData.data);
        return tokenData.data;
    } catch (error) {
        console.error("Erreur lors de l'obtention du token:", error);
        return null;
    }
}
{/* Planifier une notification locale */}

export async function scheduleLocalNotification(
    title: string,
    body: string,
    data?: Record<string, unknown>,
    triggerInSeconds: number = 9
) {
    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                data,
            },
            trigger: { seconds: triggerInSeconds },
        });
        console.log('Notification locale planifiée.');
    } catch (error) {
        console.error('Erreur lors de la planification de la notification locale:', error);
    }
}

 {/*Écouteurs de notifications*/}
export function setupNotificationListeners() {
    Notifications.addNotificationReceivedListener(notification => {
        console.log('Notification reçue:', notification);
    });

    Notifications.addNotificationResponseReceivedListener(response => {
        console.log('Réponse à la notification:', response);
    });
}
