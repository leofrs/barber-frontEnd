import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AdminService } from '../../../services/admin';
import NavBar from '../../../components/sair';
const adminService = new AdminService();

const UsersDetailsScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await adminService.getAllUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Erro ao buscar os dados dos usuários:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          height: '10%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#000000',
        }}
      >
        <Image
          source={require('../../../../assets/logo.png')}
          style={styles.logo}
        />
        <NavBar />
      </View>
      <DataTable style={styles.containerTable}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.tableHeaderText}>Name</DataTable.Title>
          <DataTable.Title style={styles.tableHeaderText}>
            Apelido
          </DataTable.Title>
          <DataTable.Title style={styles.tableHeaderText}>
            Telefone
          </DataTable.Title>
        </DataTable.Header>

        {users.map((user, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={styles.tableCell}>
              {user.name}
            </DataTable.Cell>
            <DataTable.Cell style={styles.tableCell}>
              {user.apelido}
            </DataTable.Cell>
            <DataTable.Cell style={styles.tableCell}>
              {user.numero}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerTable: {
    gap: 10,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  tableHeaderText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableCell: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  logo: {
    width: '50%',
    height: '100%',
    objectFit: 'scale-down',
  },
});

export default UsersDetailsScreen;
