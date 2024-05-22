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
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
        <NavBar />
      </View>
      <View style={styles.header}>
        <Text style={{ marginVertical: 5, color: '#000000' }}>
          Seja bem vindo Chefe{user.name}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={handleClient}>
          <Text>Clientes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleAgenda}>
          <Text>Agenda</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    height: '70%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#FFEFC7',
    borderTopStartRadius: 45,
    borderTopEndRadius: 45,
    backgroundColor: '#000000',
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
    width: '50%',
    height: '100%',
    objectFit: 'scale-down',
  },
});
