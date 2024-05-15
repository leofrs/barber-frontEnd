import { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/contextProvider';
import NavBar from '../../components/sair';

export default function AdminPage({ navigation }) {
  const { user } = useContext(AuthContext);

  const handleClient = () => {
    navigation.navigate('Clients');
  };
  const handleAgenda = () => {
    navigation.navigate('Agenda');
  };
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <Text style={{ color: '#FFEFC7', marginBottom: 25 }}>
        Seja bem vindo chefe {user}!
      </Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={handleClient}>
          <Text>Clientes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleAgenda}>
          <Text>Agenda</Text>
        </TouchableOpacity>
      </View>
      <NavBar />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    margin: 5,
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFEFC7',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: '#ffffff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  signUpText: {
    textAlign: 'center',
    color: '#ffffff',
  },
  signUpLink: {
    fontWeight: 'bold',
    color: '#FFEFC7',
    fontStyle: 'italic',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
});
