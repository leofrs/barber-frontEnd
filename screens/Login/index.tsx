import { View, StatusBar, Image } from "react-native";

import FormLogin from "../../components/forms/FormLogin";

import { styles } from "./styles";
import { Footer } from "../../components/footer";

const LoginScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Image
        source={require("../../assets/logo.png")}
        style={styles.logoImage}
      />

      <FormLogin navigation={navigation} />

      <Footer />
    </View>
  );
};

export default LoginScreen;
