import AsyncStorage from '@react-native-async-storage/async-storage';
import { Comentario } from '../types';

const chave = (pontoId: string): string => `comentarios:${pontoId}`;

export const listarComentarios = async (pontoId: string): Promise<Comentario[]> => {
    const salvo = await AsyncStorage.getItem(chave(pontoId));
    return salvo ? (JSON.parse(salvo) as Comentario[]) : [];
};

export const salvarComentarios = async (
    pontoId: string,
    lista: Comentario[]
): Promise<void> => {
    await AsyncStorage.setItem(chave(pontoId), JSON.stringify(lista));
};