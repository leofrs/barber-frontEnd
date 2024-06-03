import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function FormLogin({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      numero: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Faça o seu login</Text>
      <Controller
        control={control}
        name="numero"
        rules={{
          required: true,
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            style={styles.input}
            placeholder="Insira seu número"
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
        <Text style={{ textAlign: "center", color: "#000000" }}>Login</Text>
      </Pressable>

      <View style={{ marginTop: 25 }}>
        <Text style={{ color: "white", textAlign: "center" }}>
          Não tem uma conta ?{" "}
          <Text
            onPress={() => navigation.navigate("RegisterScreen")}
            style={{ color: "#FFEFC7" }}
          >
            Cadastre-se
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
    width: 300,
    height: "auto",
    paddingVertical: 5,
    borderRadius: 25,
    borderColor: "#FFEFC7",
    backgroundColor: "#FFEFC7",
  },
});
