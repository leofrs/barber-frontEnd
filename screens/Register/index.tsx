import { View, StatusBar, Image } from "react-native";

import FormRegister from "../../components/forms/FormRegister";
import { Footer } from "../../components/footer";

import { styles } from "./styles";

export const Register = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.logoView}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.form}>
        <FormRegister navigation={navigation} />
      </View>

      <Footer />
    </View>
  );
};
