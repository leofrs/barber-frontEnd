import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";

import { styles } from "./styles";
import NavBar from "../../../components/navbar";

export const HomeAdmin = ({ navigation }: any) => {
  const handleClient = () => {
    navigation.navigate("ClientsaAdminScreen");
  };
  const handleAgenda = () => {
    navigation.navigate("AgendaAdminScreen");
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View
        style={{
          alignItems: "center",
          width: "100%",
          height: "10%",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#000000",
        }}
      >
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
        <NavBar />
      </View>

      <View
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          height: "20%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ marginVertical: 5, color: "#000000", fontSize: 20 }}>
          Seja bem vindo Chefe
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={handleClient}>
          <Text>Clientes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleAgenda}>
          <Text>Agenda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
