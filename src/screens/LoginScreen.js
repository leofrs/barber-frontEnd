import { useRef, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

const Logo = require('../../assets/logo.png');

export function LoginScreen({ navigation }) {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const { setUser } = useContext(AuthContext);

  const handleLogin = () => {
    if (username === 'user' && password === '1234') {
      setUser({ username });
    } else {
      alert('Credenciais inválidas');
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#DDD" />
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
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
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signupText}>Não tem uma conta? Cadastre-se</Text>
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
