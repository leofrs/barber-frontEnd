import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";

import { useContext } from "react";
import { AuthContext } from "../../context/contextProvider";

import { UserService } from "../../services/api";
const userService = new UserService();

import NavBar from "../../components/navbar";

import moment from "moment";

import { styles } from "./styles";

export default function HomeClient({ navigation }: any) {
  const [userData, setUserData] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userService.getCalendario();
        setUserData(userData);
      } catch (error) {
        console.error("Erro ao buscar os dados da data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleHorarios = async (diaSemanaId, dia, data) => {
    try {
      const horarios = await userService.apiHorariosDisponiveis(diaSemanaId);
      if (horarios) {
        navigation.navigate("Horarios", { diaSemanaId, dia, data, horarios });
      } else {
        Alert.alert("erro foi encontrado, tente novamente");
      }
    } catch (error) {
      Alert.alert(`Error na requisição foi encontrado: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
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
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <NavBar />
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>Seja bem vindo</Text>
        <Text style={{ marginVertical: 5, color: "#000000" }}>{user.name}</Text>
        <Text
          style={{
            marginBottom: 20,
            color: "#000000",
            maxWidth: 250,
            textAlign: "center",
          }}
        >
          Agradeço pela sua preferência e vamos juntos melhorar cada vez mais
        </Text>
      </View>

      <View style={styles.cardContainer}>
        {userData &&
          userData.map((item) => {
            const originalDate = item.data;
            const formattedDate = moment.utc(originalDate).format("DD/MM/YYYY");

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => handleHorarios(item.id, item.dia, item.data)}
              >
                <Text>{item.dia}</Text>
                <Text>{formattedDate}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
}
