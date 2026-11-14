import { type JSX } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    visible: boolean;
    onFechar: () => void;
};

const SobreProjetoModal = ({ visible, onFechar }: Props): JSX.Element => {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onFechar}>
            <Pressable style={styles.overlay} onPress={onFechar}>
                {/* Pressable interno: tocar dentro do cartão não fecha */}
                <Pressable style={styles.card} onPress={() => {}}>
                    <View style={styles.topo}>
                        <Text style={styles.titulo}>Bem-vindo ao Zela</Text>
                        <TouchableOpacity onPress={onFechar} hitSlop={10}>
                            <Ionicons name="close" size={24} color="#263746" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} style={styles.corpo}>
                        <Text style={styles.rotulo}>O problema</Text>
                        <Text style={styles.texto}>
                            Buracos, lixo, alagamentos e outros problemas do bairro muitas vezes
                            não são registrados nem acompanhados.
                        </Text>

                        <Text style={styles.rotulo}>Como funciona</Text>
                        <Text style={styles.texto}>
                            Toque em "Marcar ponto", escolha o local no mapa e a categoria do
                            problema. Os moradores podem abrir o ponto e comentar.
                        </Text>

                        <Text style={styles.rotulo}>Quem ajuda</Text>
                        <Text style={styles.texto}>
                            Moradores que querem melhorar o espaço público do bairro.
                        </Text>


                    </ScrollView>

                    <TouchableOpacity style={styles.botao} onPress={onFechar} activeOpacity={0.8}>
                        <Text style={styles.botaoTexto}>Entendi</Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default SobreProjetoModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        maxHeight: '75%',
        elevation: 8,
    },
    topo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    titulo: { fontSize: 20, fontWeight: 'bold', color: '#263746' },
    corpo: { flexGrow: 0 },
    rotulo: { fontSize: 13, fontWeight: '700', color: '#20B8A5', marginTop: 12 },
    texto: { fontSize: 14, color: '#4B5563', marginTop: 4, lineHeight: 20 },
    botao: {
        backgroundColor: '#173B57',
        borderRadius: 30,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 18,
    },
    botaoTexto: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});