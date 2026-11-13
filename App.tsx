import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import HomeScreen from './screens/HomeScreen';
import DetalheScreen from './screens/DetalheScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detalhe" component={DetalheScreen} options={{ title: 'Detalhes do ponto' }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
