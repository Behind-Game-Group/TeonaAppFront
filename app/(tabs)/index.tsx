import {Image, StyleSheet} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {Link} from 'expo-router';

export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome!</ThemedText>
                <HelloWave/>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <Link href={'/hub/login'}>Login</Link>
                <Link href={'/hub/register'}>Register</Link>
                <Link href={'/wallet/FormTeonaPass'}>Wallet</Link>
                <Link href={'/wallet/TopupFares'}>Topup</Link>
                <Link href={'/bus/bus'}>Bus</Link>
                <Link href={'/wallet/(teonaPass)/TopupFares'}>test</Link>
                <Link href={'/sky/sky'}>Sky</Link>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
        // Color white
        backgroundColor: '#fff',
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});