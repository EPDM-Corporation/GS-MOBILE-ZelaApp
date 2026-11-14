import AsyncStorage from '@react-native-async-storage/async-storage';

export type Conta = { username: string; password: string };
export type Sessao = { username: string };

const CHAVE_CONTA = 'account';
const CHAVE_SESSAO = 'session';

export const buscarConta = async (): Promise<Conta | null> => {
    const salvo = await AsyncStorage.getItem(CHAVE_CONTA);
    return salvo ? (JSON.parse(salvo) as Conta) : null;
};

export const salvarConta = async (conta: Conta): Promise<void> => {
    await AsyncStorage.setItem(CHAVE_CONTA, JSON.stringify(conta));
};

export const buscarSessao = async (): Promise<Sessao | null> => {
    const salvo = await AsyncStorage.getItem(CHAVE_SESSAO);
    return salvo ? (JSON.parse(salvo) as Sessao) : null;
};

export const salvarSessao = async (sessao: Sessao): Promise<void> => {
    await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
};

export const encerrarSessao = async (): Promise<void> => {
    await AsyncStorage.removeItem(CHAVE_SESSAO);
};