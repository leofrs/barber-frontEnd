import React, { useState, useEffect } from "react";
import { ScrollView, Alert, View, Image } from "react-native";
import { DataTable } from "react-native-paper";
import NavBar from "../../../../components/navbar";
import { format } from "date-fns";
import { AdminService } from "../../../../services/api";

import { styles } from "./styles";

const adminService = new AdminService();

export const HorariosAdmin = ({ route }: any) => {
  const { dia, data, horarios } = route.params;
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  const formattedDate = format(new Date(data), "dd/MM/yyyy");

  useEffect(() => {
    const fetchHorariosDisponiveis = async () => {
      try {
        const horariosDisponiveis = await Promise.all(
          horarios.map(async (horario) => {
            if (horario.userId) {
              try {
                const user = await adminService.getUserById(horario.userId);
                return { ...horario, userName: user.name };
              } catch (error) {
                console.error(
                  `Erro ao buscar usuário com ID ${horario.userId}:`,
                  error
                );
                return horario; // Retorne o horário original se houver um erro
              }
            } else {
              return horario;
            }
          })
        );
        setHorariosDisponiveis(horariosDisponiveis);
      } catch (error) {
        console.error("Erro ao buscar os horários disponíveis:", error);
      }
    };

    fetchHorariosDisponiveis();
  }, [horarios]);

  const selecionarHorario = (id) => {
    if (horarioSelecionado === id) {
      Alert.alert("Atenção!", "Este horário já foi selecionado.");
    } else {
      setHorarioSelecionado(id);
      Alert.alert("Sucesso!", "Seu horário foi marcado");
    }
  };

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
          source={require("../../../../assets/logo.png")}
          style={styles.logo}
        />
        <NavBar />
      </View>
      <DataTable style={styles.containerTable}>
        <DataTable.Header>
          <DataTable.Title>Horario</DataTable.Title>
          <DataTable.Title>Disponível</DataTable.Title>
          <DataTable.Title>Cliente</DataTable.Title>
        </DataTable.Header>

        {horariosDisponiveis.map((item) => (
          <DataTable.Row key={item.id} style={{ borderColor: "#000" }}>
            <DataTable.Cell
              style={{
                width: "100%",
              }}
            >
              {item.horario}
            </DataTable.Cell>
            <DataTable.Cell
              style={{
                width: "100%",
              }}
            >
              {item.disponivel ? "Sim" : "Não"}
            </DataTable.Cell>
            <DataTable.Cell
              style={{
                width: "100%",
              }}
            >
              {item.userName}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};
