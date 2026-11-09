import { useState, type JSX } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;
const CadastroScreen = ({ navigation }: Props): JSX.Element => {
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    const [errorUser, setErrorUser] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState<string>('');

        const validateUser = (userInput: string): string => {
        if (userInput.trim().length < 3) {
            return 'Usuário com mínimo de 3 letras';
        }
        return '';
    }

    const validatePassword = (userInput: string): string => {
        if (userInput.trim().length < 6) {
            return 'Senha no mínimo de 6 letras';
        }
        return '';
    }

    const validatePasswordConfirm = (userPassword: string, userPasswordConfirm: string): string => {
        if (userPassword !== userPasswordConfirm) {
            return 'Senha não é a mesma';
        }
        return '';
    }

    const changeUser = (text: string): void => {
        setUser(text);
        setErrorUser(validateUser(text));
    }
    
    const changePassword = (text: string): void => {
        setPassword(text);
        setErrorPassword(validatePassword(text));
    }
    
    const changePasswordConfirm = (text: string): void => {
        setPasswordConfirm(text);
        setErrorPasswordConfirm(validatePasswordConfirm(password, text));
    }

    const cadastro = async (): Promise<void> => {

        const messageUser = validateUser(user);
        const messagePassword = validatePassword(password);
        const messagePasswordConfirm = validatePasswordConfirm(password, passwordConfirm);


        setErrorUser(messageUser);
        setErrorPassword(messagePassword);
        setErrorPasswordConfirm(messagePasswordConfirm);

        if (messageUser !== '' || messagePassword !== '' || messagePasswordConfirm !== '') {
            return;
        }

        try{
            await AsyncStorage.setItem(
                'account',
                JSON.stringify({ username: user, password: password })
            );
            await AsyncStorage.setItem('session', JSON.stringify({ username: user }));
            
            Alert.alert("Sucesso", "Conta criada com sucesso!", [
                { text: "OK", onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] }) }   
        ]);
        } catch (error){
            Alert.alert("Erro", "Não foi possível cadastrar os dados. Tente novamente.");
        }

    }

  return (
<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
        
        <View style = {styles.content}>
            <Image source={require('../assets/ZelaLogo.png')} style={styles.logo}></Image>
            <Text style={styles.title}>Cadastro</Text>
            <Text style={styles.subtitle}>Usuário</Text>
            <TextInput
                    style={styles.input}
                    placeholder="Seu usuário.."
                    placeholderTextColor="#9A9AA3"
                    value={user}
                    onChangeText={changeUser}
                />
            {errorUser !== '' && <Text style={styles.error}>{errorUser}</Text>}
            <Text style={styles.subtitle}>Senha</Text>
            <TextInput
                    style={styles.input}
                    placeholder="Sua senha..."
                    placeholderTextColor="#9A9AA3"
                    value={password}
                    onChangeText={changePassword}
                    secureTextEntry={true}
                />
            {errorPassword !== '' && <Text style={styles.error}>{errorPassword}</Text>}

            <Text style={styles.subtitle}>Confirme sua senha</Text>
            <TextInput
                    style={styles.input}
                    placeholder="Confirme a senha..."
                    placeholderTextColor="#9A9AA3"
                    value={passwordConfirm}
                    onChangeText={changePasswordConfirm}
                    secureTextEntry={true}
                />
            {errorPasswordConfirm !== '' && <Text style={styles.error}>{errorPasswordConfirm}</Text>}
            <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} >Cadastrar</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default CadastroScreen
const styles = StyleSheet.create({
    screen: {flex: 1},
    content: { flex: 1, justifyContent: 'center', paddingHorizontal: 28 },
    title: { color: '#263746', fontSize: 28, fontWeight: 'bold' },
    subtitle: {color: '#263746', fontSize: 14, marginTop: 17, marginBottom: 17 },
    input: { borderWidth: 1, borderColor: '#2A2A31', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, color: '#263746', fontSize: 16 },
    button: { backgroundColor: '#173B57', borderRadius: 30, paddingVertical: 14, alignItems: 'center', marginTop: 36 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    error: { color: '#FF4D94', fontSize: 12, marginTop: 4 },
    logo: { width: 160, height: 160, alignSelf: 'center', marginBottom: 24, resizeMode: 'contain' }
});