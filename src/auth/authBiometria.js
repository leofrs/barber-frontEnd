import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export async function handleAuthentication({ navigation }) {
  const compatibile = await LocalAuthentication.hasHardwareAsync();
  const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!isBiometricEnrolled) {
    return Alert.alert('Autenticação de Login', 'Nenhuma Biometria encontrada');
  }

  const auth = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Login com Biometria',
    fallbackLabel: 'Falha na Biometria',
  });

  if (auth && compatibile) {
    return navigation.navigate('Home');
  } else {
    return Alert.alert('Usúario não encontrado');
  }
}
