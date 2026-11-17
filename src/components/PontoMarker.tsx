import { type JSX, memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ponto } from '../types';
import { getCategoria } from '../constants/categorias';

type Props = {
    ponto: Ponto;
    onPress?: (ponto: Ponto) => void; 
};

const PontoMarker = ({ ponto, onPress }: Props): JSX.Element => {
    const cat = getCategoria(ponto.categoria);
    const [track, setTrack] = useState(true);
    useEffect(() => {
        const t = setTimeout(() => setTrack(false), 500);
        return () => clearTimeout(t);
    }, []);

    return (
        <Marker
            coordinate={{ latitude: ponto.latitude, longitude: ponto.longitude }}
            onPress={() => onPress?.(ponto)}
            tracksViewChanges={track}
            anchor={{ x: 0.5, y: 1 }}
        >
            <View style={styles.wrapper}>
                <View style={[styles.bolha, { backgroundColor: cat.fundo, borderColor: cat.cor }]}>
                    <MaterialCommunityIcons name={cat.icone} size={22} color={cat.cor} />
                </View>
                <View style={[styles.ponta, { borderTopColor: cat.cor }]} />
            </View>
        </Marker>
    );
};

export default memo(PontoMarker);

const styles = StyleSheet.create({
    wrapper: { alignItems: 'center' },
    bolha: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ponta: {
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        marginTop: -1,
    },
});