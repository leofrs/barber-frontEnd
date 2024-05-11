import { useContext } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { AuthContext } from '../context/contextProvider';

export default function NavBar({ navigation }) {
  const { setUser } = useContext(AuthContext);

  const handleSair = () => {
    setUser(null);
    Alert.alert('Te vejo em breve');
  };
  return (
    <View>
      <Button title="Sair" color="red" onPress={() => handleSair()} />
    </View>
  );
}
