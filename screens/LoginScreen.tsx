import { useState, type JSX } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
    const LoginScreen = ({ navigation }: Props): JSX.Element => {
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const changeUser = (text: string): void => {
        setUser(text);
    }

    const changePassword = (text: string): void => {
        setPassword(text);
    }

    const changeError = (text:string): void => {
        setError(text)
    }
    const login = async (): Promise<void> => {
        try {
            const stored = await AsyncStorage.getItem('account');

            
            if (stored === null) {
                changeError("Conta não encontrada")
                return;
            }

            const account = JSON.parse(stored);

            if (account.username !== user || account.password !== password) {    
                changeError("Usuário ou senha errada.")
                return
            }

            await storeSession();
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        } catch (error) {
            Alert.alert("Erro", "Não foi possível acessar os dados. Tente novamente.");
        }
    };

    const storeSession = async (): Promise<void> => {
        try{
            await AsyncStorage.setItem(
                'session',
                JSON.stringify({ username: user })
            );
       
        } catch (error){
            Alert.alert("Erro", "Não foi possível acessar os dados. Tente novamente.");    
        }
    }
    const navCadastro = (): void => {
        navigation.navigate('Cadastro')
    }
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
        
        <View style = {styles.content}>
            <Image source={require('../assets/ZelaLogo.png')} style={styles.logo}></Image>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Usuário </Text>
            <TextInput
                    style={styles.input}
                    placeholder="Seu usuário.."
                    placeholderTextColor="#9A9AA3"
                    value={user}
                    onChangeText={changeUser}
                />
            <Text style={styles.subtitle}>Senha</Text>
            <TextInput
                    style={styles.input}
                    placeholder="Sua senha..."
                    placeholderTextColor="#9A9AA3"
                    value={password}
                    onChangeText={changePassword}
                    secureTextEntry={true}
                />
            {error !== '' && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity style={styles.subtitle} onPress={navCadastro}>
                <Text style={styles.subtitle} >Não tem conta? Cadastre-se</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={login}>
                    <Text style={styles.buttonText} >Entrar</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen
const styles = StyleSheet.create({
    screen: {flex: 1},
    content: { flex: 1, justifyContent: 'center', paddingHorizontal: 28 },
    title: { color: '#263746', fontSize: 28, fontWeight: 'bold' },
    subtitle: {color: '#263746', fontSize: 14, marginTop: 17, marginBottom: 17 },
    input: { borderWidth: 1, borderColor: '#2A2A31', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, color: '#263746', fontSize: 16 },
    button: { backgroundColor: '#173B57', borderRadius: 30, paddingVertical: 14, alignItems: 'center', marginTop: 24 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    error: { color: '#FF4D94', fontSize: 12, marginTop: 4 },
    logo: { width: 160, height: 160, alignSelf: 'center', marginBottom: 24, resizeMode: 'contain' }
    
});