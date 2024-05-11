import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

import { AdminService } from '../../services/admin';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const adminService = new AdminService();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = await adminService.getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <View>
      <Text>Seja bem vindo - nome do gerente aqui - !</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
