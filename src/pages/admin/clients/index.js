import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DataTable } from 'react-native-paper';

import { AdminService } from '../../../services/admin';
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
        justifyContent: 'center',
      }}
    >
      <StatusBar hidden />
      <DataTable style={styles.containerTable}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.tableHeaderText}>Name</DataTable.Title>
          <DataTable.Title style={styles.tableHeaderText}>
            Email
          </DataTable.Title>
        </DataTable.Header>

        {users.map((user, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={styles.tableCell}>
              {user.name}
            </DataTable.Cell>
            <DataTable.Cell style={styles.tableCell}>
              {user.email}
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
});

export default UsersDetailsScreen;
