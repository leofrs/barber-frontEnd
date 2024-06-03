import {
  View,
  StatusBar,
  ImageBackground,
  Pressable,
  Text,
} from "react-native";

import { styles } from "./styles";

export const Home = ({ navigation }: any) => {
  return (
    <View>
      <StatusBar hidden />
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.containerImage}
      >
        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.buttons}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={{ color: "#000000" }}>Login</Text>
          </Pressable>

          <Pressable
            style={styles.buttons}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={{ color: "#000000" }}>Cadastro</Text>
          </Pressable>
        </View>

        <View style={styles.footerContainer}>
          <Text style={{ textAlign: "center", color: "#ffffff" }}>
            Desenvolvido por @leofrs9
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};
