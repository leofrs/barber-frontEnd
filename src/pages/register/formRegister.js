import React from 'react';
import {
  Pressable,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

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

  const onSubmit = (data) => console.log(data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça seu cadastro</Text>
      <Controller
        control={control}
        name="name"
        rules={{
          required: true,
          pattern: {
            message: 'Nome inválido',
            value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i,
          },
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            style={styles.input}
            placeholder="Insira seu nome"
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            onBlur={onBlur}
          />
        )}
      />
      {errors.name && <Text style={styles.errorText}>Nome é obrigatório.</Text>}
      <Controller
        control={control}
        name="telefone"
        rules={{
          required: true,
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            style={styles.input}
            placeholder="Insira seu número de telefone"
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{
          minLength: 4,
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            style={styles.input}
            placeholder="Insira sua senha"
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
      <Button title="Entrar" onPress={handleSubmit(onSubmit)} />
      <Pressable style={styles.signUpButton}>
        <Text style={styles.signUpText}>
          Já possui uma conta?{' '}
          <Text
            style={styles.signUpLink}
            onPress={() => navigation.navigate('Login')}
          >
            Faça o login
          </Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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
  },
  signUpLink: {
    fontWeight: 'bold',
    color: 'blue',
  },
});
