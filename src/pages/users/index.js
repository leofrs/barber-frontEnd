import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { data } from '../../../db/datas';

export default function DataPage({ navigation }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userData = data();
    setUserData(userData);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20 }}>Seja bem vindo - Jardas - !</Text>
      <Text>Logo vai aqui</Text>
      <View style={styles.cardContainer}>
        {userData &&
          userData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('Horários', {
                  dia: item.dia,
                  data: item.data,
                  manha: item.manha,
                  tarde: item.tarde,
                })
              }
            >
              <Text>Dia: {item.dia}</Text>
              <Text>Data: {item.data}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpText: {
    textAlign: 'center',
  },
  signUpLink: {
    fontWeight: 'bold',
    color: 'blue',
  },
});
