import { type JSX, useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props): JSX.Element => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            // 1. Solicita permissão de acesso à localização
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão de acesso à localização negada.');
                return;
            }

            // 2. Obtém a posição atual do usuário
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        })();
    }, []);

    const sair = async (): Promise<void> => {
        await AsyncStorage.removeItem('session');
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    };

    return (
        <SafeAreaView style={styles.screen} edges={['top', 'bottom', 'left', 'right']}>
                <View style={styles.screen}>
                    {/*//////////////MAPA/////////////*/}
                    {!location && !errorMsg ? (
                        <View style={styles.center}>
                            <ActivityIndicator size="large" color="#173B57" />
                            <Text style={{ marginTop: 10 }}>Obtendo sua localização...</Text>
                        </View>
                    ) : errorMsg ? (
                        <View style={styles.center}>
                            <Text style={{ color: 'red' }}>{errorMsg}</Text>
                        </View>
                    ) : (
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: location?.coords.latitude || -23.5505,
                                longitude: location?.coords.longitude || -46.6333,
                                latitudeDelta: 0.009,
                                longitudeDelta: 0.009,
                            }}
                            showsUserLocation={true}
                            showsMyLocationButton={true}
                        >
                            {location && (
                                <Marker
                                    coordinate={{
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,
                                    }}
                                    title="Você está aqui"
                                    description="Localização atual capturada pelo GPS"
                                />
                            )}
                        </MapView>
                    )}
                    {/*//////////////FIM DO MAPA/////////////*/}
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Toque no mapa para marcar</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>


    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    screen: { flex: 1 },
    content: { flex: 1, justifyContent: 'center' },
    title: { color: '#263746', fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
    mapContainer: { 
        flex: 1, 
        borderWidth: 1, 
        borderColor: '#2A2A31', 
        borderRadius: 12, 
        overflow: 'hidden', 
        marginVertical: 10 
    },
    map: { width: '100%', height: '100%' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    button: {
            position: 'absolute',
            bottom: 30,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#20B8A5',
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderRadius: 30,
            elevation: 6,
            gap: 10,
        
        },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});