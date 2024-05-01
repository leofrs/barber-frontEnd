import { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

const Logo = require('../../assets/logo.png');

import { UserApi } from '../services/userApi';
const userApi = new UserApi();

export function RegisterScreen({ navigation }) {
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const user = {
    nome: nameRef.current.valueOf,
    email: emailRef.current.valueOf,
    password: passwordRef.current.valueOf,
  };

  const handleRegister = async () => {
    try {
      const response = await userApi.postUser(user);
      if (response.data) {
        Alert.alert('Sucesso', 'Usário  Castradado com sucesso!');
      } else {
        Alert.alert('Erro', 'Credenciais inválidas');
      }
    } catch (error) {
      console.log(`Error encontrado: ${error}`);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Nome"
          placeholderTextColor="#FFEFC7"
          ref={nameRef}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#FFEFC7"
          ref={emailRef}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Senha"
          placeholderTextColor="#FFEFC7"
          secureTextEntry
          ref={passwordRef}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
        <Text style={styles.loginText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signupText}>Já tem uma conta? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#e0e0e0',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#003f5c',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#FFEFC7',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  signupText: {
    color: '#FFEFC7',
    marginTop: 15,
  },
});
