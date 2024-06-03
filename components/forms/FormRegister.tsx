import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { UserService } from "../../services/api";

export default function FormRegister({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      apelido: "",
      numero: "",
      password: "",
    },
  });

  const userService = new UserService();

  const onSubmit = (data) => {
    const { name, apelido, numero, password } = data;
    try {
      if (!name && !apelido && !numero && !password) {
        Alert.alert("Erro", "Por favor, preencha todos os campos");
        return;
      }
      const registerUser = userService.postUser({
        name,
        apelido,
        numero,
        password,
      });
      if (registerUser) {
        Alert.alert("Sucesso!", `Usúario ${data.name} cadastrado com sucesso`);
        navigation.navigate("LoginScreen");
      } else {
        Alert.alert("Error", "Usúario não cadastrado");
      }
    } catch (error) {
      Alert.alert("Error", `Error encontrado: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Faça o seu cadastro</Text>
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
            placeholderTextColor={"#FFEFC7"}
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
        name="apelido"
        rules={{
          required: true,
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            style={styles.input}
            placeholder="Insira seu apelido (caso tenha)"
            placeholderTextColor={"#FFEFC7"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            onBlur={onBlur}
          />
        )}
      />
      {errors.apelido && (
        <Text style={styles.errorText}>Apelido é obrigatório.</Text>
      )}
      <Controller
        control={control}
        name="numero"
        rules={{
          required: true,
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            style={styles.input}
            placeholder="Insira seu numero (sem espaços)"
            placeholderTextColor={"#FFEFC7"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            onBlur={onBlur}
          />
        )}
      />
      {errors.numero && (
        <Text style={styles.errorText}>Numero é obrigatório.</Text>
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
            placeholderTextColor={"#FFEFC7"}
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
      <Pressable style={styles.buttonLogin} onPress={handleSubmit(onSubmit)}>
        <Text style={{ textAlign: "center" }}>Cadastrar</Text>
      </Pressable>

      <View style={{ marginTop: 25 }}>
        <Text style={{ color: "white", textAlign: "center" }}>
          Já tem uma conta ?{" "}
          <Text
            onPress={() => navigation.navigate("LoginScreen")}
            style={{ color: "#FFEFC7" }}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: "auto",
    alignItems: "center",
  },
  text: {
    color: "#FFEFC7",
    textAlign: "center",
    marginBottom: 25,
    fontSize: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  buttonLogin: {
    borderWidth: 2,
    width: 300,
    height: "auto",
    paddingVertical: 5,
    borderRadius: 25,
    borderColor: "#FFEFC7",
    backgroundColor: "#FFEFC7",
    color: "#000000",
  },
});
