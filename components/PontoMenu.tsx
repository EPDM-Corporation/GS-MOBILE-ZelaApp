import { type JSX } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { CATEGORIAS } from '../constants/categorias';
import { CategoriaId } from '../types';
type Props = {
    visible: boolean;
    onFechar: () => void;
    onEscolher: (categoria: CategoriaId) => void;
    onCancelar: () => void;
};

const PontoMenu = ({ visible, onFechar, onEscolher, onCancelar }: Props): JSX.Element => {
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onFechar}>
            <Pressable style={styles.overlay} onPress={onFechar}>
                <Pressable style={styles.sheet} onPress={() => {}}>
                    <View style={styles.handle} />
                    <Text style={styles.titulo}>O que você quer reportar?</Text>

                    <ScrollView style={styles.lista} showsVerticalScrollIndicator={false}>
                        {CATEGORIAS.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                style={styles.item}
                                onPress={() => onEscolher(cat.id)}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.icone, { backgroundColor: cat.fundo }]}>
                                    <MaterialCommunityIcons name={cat.icone} size={24} color={cat.cor} />
                                </View>
                                <View style={styles.textos}>
                                    <Text style={styles.nome}>{cat.nome}</Text>
                                    <Text style={styles.descricao}>{cat.descricao}</Text>
                                    <Text style={[styles.badge, { color: cat.corPrioridade }]}>
                                        {cat.prioridade}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <TouchableOpacity style={styles.descartar} onPress={onCancelar}>
                        <Ionicons name="trash-outline" size={20} color="#D93025" />
                        <Text style={styles.descartarTexto}>Descartar ponto</Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default PontoMenu;

const styles = StyleSheet.create({
    overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.25)' },
    sheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 10,
        maxHeight: '75%',
    },
    handle: {
        alignSelf: 'center',
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#ccc',
        marginBottom: 14,
    },
    titulo: { fontSize: 18, fontWeight: 'bold', color: '#263746', marginBottom: 8 },
    lista: { flexGrow: 0 },
    item: {
        flexDirection: 'row',
        gap: 14,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E5E7EB',
    },
    icone: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textos: { flex: 1 },
    nome: { fontSize: 15, fontWeight: 'bold', color: '#111827' },
    descricao: { fontSize: 13, color: '#4B5563', marginTop: 2 },
    badge: { fontSize: 12, fontWeight: '700', marginTop: 4 },
    descartar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingTop: 16,
    },
    descartarTexto: { color: '#D93025', fontSize: 15, fontWeight: '600' },
});