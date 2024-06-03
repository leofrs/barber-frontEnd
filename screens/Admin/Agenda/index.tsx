import { Text, View, TouchableOpacity, Alert, Image } from "react-native";
import { useEffect, useState } from "react";

import { AdminService } from "../../../services/api";

import NavBar from "../../../components/navbar";

import moment from "moment";

import { styles } from "./styles";

const adminService = new AdminService();

export function AgendaAdmin({ navigation }: any) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await adminService.getCalendario();
        setData(userData);
      } catch (error) {
        console.error("Erro ao buscar os dados da data:", error);
      }
    };

    fetchUserData();
  });
  const handleHorarios = async (diaSemanaId, dia, data) => {
    try {
      const horarios = await adminService.apiHorariosDisponiveis(diaSemanaId);
      if (horarios) {
        navigation.navigate("HorariosAdminScreen", {
          diaSemanaId,
          dia,
          data,
          horarios,
        });
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
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
        <NavBar />
      </View>

      <View>
        <Text style={{ marginVertical: 5, color: "#000000", fontSize: 20 }}>
          Selecione o dia e veja a sua agenda
        </Text>
      </View>

      <View style={styles.cardContainer}>
        {data &&
          data.map((item) => {
            const originalDate = item.data;
            const formattedDate = moment.utc(originalDate).format("DD/MM/YYYY");

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => handleHorarios(item.id, item.dia, item.data)}
              >
                <Text>Dia: {item.dia}</Text>
                <Text>Data: {formattedDate}</Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
}
