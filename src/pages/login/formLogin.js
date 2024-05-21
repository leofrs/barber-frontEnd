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
import { AuthContext } from '../../context/contextProvider';

import { UserService } from '../../services/user';

export default function FormLogin({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      password: '',
    },
  });

  const { setUser, setIsAdmin, setUserInfos } = useContext(AuthContext);
  const userService = new UserService();

  const admin = { name: 'jardel', password: 'jaja' };

  const onSubmit = async (data) => {
    const { name, password } = data;
    const dataUser = await userService.getUser({ name, password });

    try {
      if (name === admin.name && password === admin.password) {
        setUser(name);
        setIsAdmin(true);
        navigation.navigate('AdminHome');
        Alert.alert(
          'Seja bem vindo Chefe',
          `É um prazer lhe receber novamente ${name}`
        );
      } else if (dataUser) {
        setUser(dataUser);
        setUserInfos(dataUser);
        navigation.navigate('HomeUser');
        Alert.alert('Seja bem vindo', `Muito bem vindo ${name}`);
      }
    } catch (error) {
      console.error('Erro ao verificar o usuário:', error);
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
        <Text style={styles.title}>Faça o login com sua conta</Text>
      </View>

      <View style={{ width: 300, marginTop: 35 }}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: true,
            pattern: {
              message: 'Nome inválido',
            },
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
          title="Entrar"
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <View style={{ marginTop: 25, width: 350 }}>
        <Pressable>
          <Text style={styles.signUpText}>
            Ainda não possui uma conta?{' '}
            <Text
              style={styles.signUpLink}
              onPress={() => navigation.navigate('Cadastro')}
            >
              Cadastre-se
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
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFEFC7',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: '#ffffff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
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
