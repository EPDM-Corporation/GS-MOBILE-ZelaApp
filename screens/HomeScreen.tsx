import { type JSX, useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PontoMenu from '../components/PontoMenu'; 
import PontoMarker from '../components/PontoMarker';
import { Coordenada, CategoriaId, Ponto, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props): JSX.Element => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [menuVisible, setMenuVisible] = useState(false); // NOVO


    const [modoMarcar, setModoMarcar] = useState(false);
    const [pinTemporario, setPinTemporario] = useState<Coordenada | null>(null);
    const [pontoMenuVisivel, setPontoMenuVisivel] = useState(false);
    const [pontosSalvos, setPontosSalvos] = useState<Ponto[]>([]);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão de acesso à localização negada.');
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        })();
    }, []);

    const sair = async (): Promise<void> => {
        setMenuVisible(false); // NOVO: fecha o menu antes de sair
        await AsyncStorage.removeItem('session');
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    };

    const aoTocarNoMapa = (e: MapPressEvent): void => {
    if (!modoMarcar) return;

    setPinTemporario(e.nativeEvent.coordinate); // coloca o pin
    setPontoMenuVisivel(true);                  // abre o menu
    setModoMarcar(false);                       // desativa o modo
    };

    const salvarPonto = (categoria: CategoriaId): void => {
        if (pinTemporario) {
            setPontosSalvos((anteriores) => [
                ...anteriores,
                { id: Date.now().toString(), ...pinTemporario, categoria },
            ]);
        }
        setPinTemporario(null);
        setPontoMenuVisivel(false);
    };
    const descartarPonto = (): void => {
        setPinTemporario(null);
        setPontoMenuVisivel(false);
    };
    const removerPonto = (id: string): void => {
        setPontosSalvos((anteriores) => anteriores.filter((p) => p.id !== id));
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
                        onPress={aoTocarNoMapa}
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

                            <PontoMarker ponto={{ id: 't1', latitude: -23.5329, longitude: -46.7917, categoria: 'buracos' }} />
                            <PontoMarker ponto={{ id: 't2', latitude: -23.5335, longitude: -46.7900, categoria: 'alagamentos' }} />
                            <PontoMarker ponto={{ id: 't3', latitude: -23.5320, longitude: -46.7930, categoria: 'transito' }} />
                            <PontoMarker ponto={{ id: 't4', latitude: -23.5340, longitude: -46.7940, categoria: 'lixo' }} />
                            <PontoMarker ponto={{ id: 't5', latitude: -23.5310, longitude: -46.7910, categoria: 'iluminacao' }} />
                            <PontoMarker ponto={{ id: 't6', latitude: -23.5345, longitude: -46.7920, categoria: 'acessibilidade' }} />
                            <PontoMarker ponto={{ id: 't7', latitude: -23.5315, longitude: -46.7895, categoria: 'riscos' }} />

                        {pinTemporario && <Marker coordinate={pinTemporario} pinColor="red" />}
                    </MapView>
                )}
                {/*//////////////FIM DO MAPA/////////////*/}

                {/*//////////////AVATAR + MENU (NOVO)/////////////*/}
                <TouchableOpacity
                    style={styles.avatarButton}
                    onPress={() => setMenuVisible(true)}
                    activeOpacity={0.8}
                >
                    <Ionicons name="person" size={22} color="#fff" />
                </TouchableOpacity>

                <Modal
                    visible={menuVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setMenuVisible(false)}
                >
                    {/* Fundo clicável: toca fora para fechar */}
                    <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
                        <SafeAreaView edges={['top', 'left']} pointerEvents="box-none">
                            <View style={styles.menu}>
                                <TouchableOpacity style={styles.menuItem}>
                                    <Ionicons name="cog" size={20}/>
                                    <Text>Configuração</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.menuItem} onPress={sair}>
                                    <Ionicons name="log-out-outline" size={20} color="#D93025" />
                                    <Text style={styles.menuItemText}>Sair</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </Pressable>
                </Modal>
                {/*//////////////FIM AVATAR + MENU/////////////*/}

                <PontoMenu
                    visible={pontoMenuVisivel}
                    onFechar={descartarPonto}
                    onEscolher={salvarPonto}
                    onCancelar={descartarPonto}
                />

                <TouchableOpacity
                    style={[styles.button, modoMarcar && styles.buttonAtivo]}
                    onPress={() => setModoMarcar((atual) => !atual)}
                >
                    <Text style={styles.buttonText}>
                        {modoMarcar ? 'Toque no mapa para marcar...' : 'Marcar ponto'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    screen: { flex: 1 },
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

    // NOVO: avatar no canto superior esquerdo
    avatarButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#173B57',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },

    // NOVO: menu
    overlay: { flex: 1 },
    menu: {
        marginTop: 68, // logo abaixo do avatar (16 + 44 + 8)
        marginLeft: 16,
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 6,
        minWidth: 140,
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    menuItemText: { color: '#D93025', fontSize: 16, fontWeight: '600' },
    buttonAtivo: { backgroundColor: '#173B57' },
});