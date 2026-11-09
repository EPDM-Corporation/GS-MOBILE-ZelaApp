import { type JSX } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Platform, TextInput, TouchableOpacity, Image} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;
const CadastroScreen = ({ navigation }: Props): JSX.Element => {
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
                />
            <Text style={styles.subtitle}>Senha</Text>
            <TextInput
                    style={styles.input}
                    placeholder="Sua senha..."
                    placeholderTextColor="#9A9AA3"
                />
            <Text style={styles.subtitle}>Confirme sua senha</Text>
            <TextInput
                    style={styles.input}
                    placeholder="Confirme a senha..."
                    placeholderTextColor="#9A9AA3"
                />
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
    button: { backgroundColor: '#173B57', borderRadius: 30, paddingVertical: 14, alignItems: 'center', marginTop: 24 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    logo: { width: 160, height: 160, alignSelf: 'center', marginBottom: 24, resizeMode: 'contain' }
});