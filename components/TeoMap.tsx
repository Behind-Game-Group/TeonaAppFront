import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { Marker, MapViewProps } from 'react-native-maps';
import * as Location from 'expo-location';

// Propriétés du composant réutilisable
interface TeoMapProps extends MapViewProps {
    showUserLocation?: boolean; // Indique si la position actuelle doit être affichée
    markerTitle?: string; // Titre du marqueur
    markerDescription?: string; // Description du marqueur
}

const TeoMap: React.FC<TeoMapProps> = ({
                                                 showUserLocation = false,
                                                 markerTitle = 'Position actuelle',
                                                 markerDescription = 'Vous êtes ici',
                                                 ...mapViewProps
                                             }) => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (showUserLocation) {
            (async () => {
                try {
                    const { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        console.error('Permission de localisation refusée.');
                        setLoading(false);
                        return;
                    }

                    const currentLocation = await Location.getCurrentPositionAsync({});
                    setLocation(currentLocation);
                } catch (error) {
                    console.error('Erreur lors de la récupération de la position :', error);
                } finally {
                    setLoading(false);
                }
            })();
        } else {
            setLoading(false);
        }
    }, [showUserLocation]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <MapView
            style={styles.map}
            initialRegion={
                location
                    ? {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }
                    : undefined
            }
            {...mapViewProps}
        >
            {location && (
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title={markerTitle}
                    description={markerDescription}
                />
            )}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    loadingContainer: {

        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TeoMap;
