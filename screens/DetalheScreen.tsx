import { type JSX, useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Comentario, RootStackParamList } from '../types';
import { getCategoria } from '../constants/categorias';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhe'>;

const DetalheScreen = ({ route }: Props): JSX.Element => {
    const { ponto } = route.params;
    const cat = getCategoria(ponto.categoria);
    const chave = `comentarios:${ponto.id}`;

    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [texto, setTexto] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const salvo = await AsyncStorage.getItem(chave);
                if (salvo) setComentarios(JSON.parse(salvo));
            } catch (e) {
                console.log('Erro ao carregar comentários', e);
            }
        })();
    }, [chave]);

    const enviar = useCallback(async (): Promise<void> => {
        const limpo = texto.trim();
        if (!limpo) return;

        const novo: Comentario = {
            id: Date.now().toString(),
            texto: limpo,
            data: new Date().toISOString(),
        };
        const lista = [novo, ...comentarios];
        setComentarios(lista);
        setTexto('');
        await AsyncStorage.setItem(chave, JSON.stringify(lista));
    }, [texto, comentarios, chave]);

    return (
        <SafeAreaView style={styles.screen} edges={['bottom', 'left', 'right']}>
            <KeyboardAvoidingView
                style={styles.screen}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <FlatList
                    data={comentarios}
                    keyExtractor={(c) => c.id}
                    contentContainerStyle={styles.lista}
                    ListHeaderComponent={
                        <View style={styles.cabecalho}>
                            <View style={[styles.icone, { backgroundColor: cat.fundo }]}>
                                <MaterialCommunityIcons name={cat.icone} size={28} color={cat.cor} />
                            </View>
                            <Text style={styles.nome}>{cat.nome}</Text>
                            <Text style={styles.descricao}>{cat.descricao}</Text>
                            <Text style={[styles.prioridade, { color: cat.corPrioridade }]}>
                                {cat.prioridade}
                            </Text>
                            <Text style={styles.secao}>Comentários ({comentarios.length})</Text>
                        </View>
                    }
                    ListEmptyComponent={
                        <Text style={styles.vazio}>Nenhum comentário ainda. Seja o primeiro!</Text>
                    }
                    renderItem={({ item }) => (
                        <View style={styles.comentario}>
                            <Text style={styles.comentarioTexto}>{item.texto}</Text>
                            <Text style={styles.comentarioData}>
                                {new Date(item.data).toLocaleString('pt-BR')}
                            </Text>
                        </View>
                    )}
                />

                <View style={styles.barra}>
                    <TextInput
                        style={styles.input}
                        placeholder="Escreva um comentário..."
                        value={texto}
                        onChangeText={setTexto}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.enviar, !texto.trim() && { opacity: 0.5 }]}
                        onPress={enviar}
                        disabled={!texto.trim()}
                    >
                        <Ionicons name="send" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};


export default DetalheScreen;

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#fff' },
    lista: { padding: 20, paddingBottom: 10 },
    cabecalho: { marginBottom: 12 },
    icone: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    nome: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
    descricao: { fontSize: 14, color: '#4B5563', marginTop: 4 },
    prioridade: { fontSize: 13, fontWeight: '700', marginTop: 6 },
    secao: { fontSize: 16, fontWeight: 'bold', color: '#263746', marginTop: 24 },
    vazio: { color: '#6B7280', textAlign: 'center', marginTop: 20 },
    comentario: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
    },
    comentarioTexto: { fontSize: 15, color: '#111827' },
    comentarioData: { fontSize: 11, color: '#6B7280', marginTop: 6 },
    barra: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 10,
        padding: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#E5E7EB',
    },
    input: {
        flex: 1,
        maxHeight: 100,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 15,
    },
    enviar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#20B8A5',
        alignItems: 'center',
        justifyContent: 'center',
    },
});