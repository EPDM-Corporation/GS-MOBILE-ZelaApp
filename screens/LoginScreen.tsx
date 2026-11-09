import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';


const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text>FINALMENTE O LOGIn</Text>
      <StatusBar style="auto" />
    </View>
  )
}

export default LoginScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});