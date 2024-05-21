import { useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Pressable,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useForm, Controller } from 'react-hook-form';
import { UserService } from '../../services/user';

export default function FormLogin({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const userService = new UserService();

  const onSubmit = (data) => {
    const { name, email, password } = data;
    try {
      if (!name && !email && !password) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos');
        return;
      }
      const registerUser = userService.postUser({ name, email, password });
      if (registerUser) {
        Alert.alert('Sucesso!', `Usúario ${data.name} cadastrado com sucesso`);
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert('Error', `Error encontrado: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Text style={styles.title}>Faça o seu cadastro</Text>
      </View>
      <View style={{ width: 300, marginTop: 35 }}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: true,
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              style={styles.input}
              placeholder="Insira seu nome"
              placeholderTextColor={'#FFEFC7'}
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              onBlur={onBlur}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.errorText}>Nome é obrigatório.</Text>
        )}
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
            pattern: {
              message: 'Email invalido',
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              style={styles.input}
              placeholder="Insira seu email"
              placeholderTextColor={'#FFEFC7'}
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              onBlur={onBlur}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>Email é obrigatório.</Text>
        )}
        <Controller
          control={control}
          name="password"
          rules={{
            minLength: 4,
            required: true,
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              style={styles.input}
              placeholder="Insira sua senha"
              placeholderTextColor={'#FFEFC7'}
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              onBlur={onBlur}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>
            Senha deve conter no mínimo 4 caracteres.
          </Text>
        )}
        <Button
          color={'blue'}
          title="Cadastrar"
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <View style={{ marginTop: 25, width: 350 }}>
        <Pressable>
          <Text style={styles.signUpText}>
            Já possui uma conta?{' '}
            <Text
              style={styles.signUpLink}
              onPress={() => navigation.navigate('Login')}
            >
              Entrar
            </Text>
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          maxWidth: 400,
          marginTop: 55,
          color: '#ffffff',
        }}
      >
        <Text style={{ color: 'white', maxWidth: 300, textAlign: 'center' }}>
          * Todos os sabádos a agenda para a próxima semana é liberada!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFEFC7',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpText: {
    textAlign: 'center',
    color: '#ffffff',
  },
  signUpLink: {
    fontWeight: 'bold',
    color: '#FFEFC7',
    fontStyle: 'italic',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
});
