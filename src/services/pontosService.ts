import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ponto } from '../types';

const CHAVE = 'pontos';

export const listarPontos = async (): Promise<Ponto[]> => {
    const salvo = await AsyncStorage.getItem(CHAVE);
    return salvo ? (JSON.parse(salvo) as Ponto[]) : [];
};

export const salvarPontos = async (pontos: Ponto[]): Promise<void> => {
    await AsyncStorage.setItem(CHAVE, JSON.stringify(pontos));
};