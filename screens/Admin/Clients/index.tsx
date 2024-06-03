import { useEffect, useState } from "react";
import { ScrollView, View, Image, StatusBar } from "react-native";
import { DataTable } from "react-native-paper";
import { AdminService } from "../../../services/api";
import NavBar from "../../../components/navbar";

import { styles } from "./styles";

const adminService = new AdminService();

export const ClientsAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await adminService.getAllUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Erro ao buscar os dados dos usuários:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{
        flex: 1,
        flexDirection: "column",
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
        <StatusBar hidden />
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
        <NavBar />
      </View>
      <DataTable style={styles.containerTable}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Apelido</DataTable.Title>
          <DataTable.Title>Telefone</DataTable.Title>
        </DataTable.Header>

        {users.map((user, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{user.name}</DataTable.Cell>
            <DataTable.Cell>{user.apelido}</DataTable.Cell>
            <DataTable.Cell>{user.numero}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};
