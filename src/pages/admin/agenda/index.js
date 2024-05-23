import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useEffect, useState } from 'react';

import { AdminService } from '../../../services/admin';

import NavBar from '../../../components/sair';

import { format } from 'date-fns';

const adminService = new AdminService();

export function HorariosMarcados({ navigation }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await adminService.getCalendario();
        setData(userData);
      } catch (error) {
        console.error('Erro ao buscar os dados da data:', error);
      }
    };

    fetchUserData();
  });
  const handleHorarios = async (diaSemanaId, dia, data) => {
    try {
      const horarios = await adminService.apiHorariosDisponiveis(diaSemanaId);
      if (horarios) {
        navigation.navigate('HorariosAdmin', {
          diaSemanaId,
          dia,
          data,
          horarios,
        });
      } else {
        Alert.alert('erro foi encontrado, tente novamente');
      }
    } catch (error) {
      Alert.alert(`Error na requisição foi encontrado: ${error}`);
    }
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
          source={require('../../../../assets/logo.png')}
          style={styles.logo}
        />
        <NavBar />
      </View>

      <View>
        <Text style={{ marginVertical: 5, color: '#000000', fontSize: 20 }}>
          Selecione o dia e veja a sua agenda
        </Text>
      </View>

      <View style={styles.cardContainer}>
        {data &&
          data.map((item) => {
            const formattedDate = format(new Date(item.data), 'dd/MM/yyyy');

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => handleHorarios(item.id, item.dia, item.data)}
              >
                <Text>Dia: {item.dia}</Text>
                <Text>Data: {formattedDate}</Text>
              </TouchableOpacity>
            );
          })}
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
  logo: {
    width: '50%',
    height: '100%',
    objectFit: 'scale-down',
  },
});
