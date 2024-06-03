import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { UserService } from "../../../services/api";
import { AuthContext } from "../../../context/contextProvider";
import moment from "moment";

import { styles } from "./styles";

import NavBar from "../../../components/navbar";

export default function Agendamento({ route }) {
  const { dia, data, horarios } = route.params;
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const userService = new UserService();
  const { userInfos } = useContext(AuthContext);

  const selecionarHorario = async (horarioId) => {
    try {
      if (!userInfos || !userInfos.id) {
        throw new Error("Usuário não autenticado");
      }

      const userId = userInfos.id;
      console.log(
        "Tentando marcar horário para usuário:",
        userId,
        "com horário:",
        horarioId
      );

      const update = await userService.marcarHorario(horarioId, userId);

      Alert.alert("Resposta do serviço de marcação de horário:", update);
    } catch (error) {
      console.error("Erro ao marcar horário:", error);
      Alert.alert(
        "Erro",
        error.message || "Ocorreu um erro ao marcar o horário"
      );
    }
  };

  const originalDate = data;
  const formattedDate = moment.utc(originalDate).format("DD/MM/YYYY");

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

      <View style={styles.textContainer}>
        <Text style={{ color: "#000000" }}>Dia: {dia}</Text>
        <Text style={{ color: "#000000" }}>Data: {formattedDate}</Text>
      </View>

      <View style={styles.cardContainer}>
        {horarios.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              !item.disponivel ? styles.disabledCard : null,
              horarioSelecionado === item.id ? styles.selectedCard : null,
            ]}
            onPress={() => selecionarHorario(item.id)}
            disabled={!item.disponivel}
          >
            <Text style={styles.cardText}>{item.horario}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.text}>
          * Os horários disponíveis ficam em verde e os que não estão
          disponíveis ficam em vermelho
        </Text>
      </View>
    </View>
  );
}
