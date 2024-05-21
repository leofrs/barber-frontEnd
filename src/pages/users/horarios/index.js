import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { UserService } from '../../../services/user';
import { AuthContext } from '../../../context/contextProvider';
import { format } from 'date-fns';

import NavBar from '../../../components/sair';

const DataDetailsScreen = ({ route }) => {
  const { dia, data, horarios } = route.params;
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const userService = new UserService();
  const { userInfos } = useContext(AuthContext);

  const selecionarHorario = async (horarioId) => {
    try {
      if (!userInfos || !userInfos.id) {
        throw new Error('Usuário não autenticado');
      }

      const userId = userInfos.id;
      console.log(
        'Tentando marcar horário para usuário:',
        userId,
        'com horário:',
        horarioId
      );

      const update = await userService.marcarHorario(horarioId, userId);

      Alert.alert('Resposta do serviço de marcação de horário:', update);
    } catch (error) {
      console.error('Erro ao marcar horário:', error);
      Alert.alert(
        'Erro',
        error.message || 'Ocorreu um erro ao marcar o horário'
      );
    }
  };

  const formattedDate = format(new Date(data), 'dd/MM/yyyy');

  return (
    <View style={styles.container}>
      <StatusBar hidden />
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

      <View style={styles.textContainer}>
        <Text style={{ color: '#000000' }}>Dia: {dia}</Text>
        <Text style={{ color: '#000000' }}>Data: {formattedDate}</Text>
      </View>

      <View style={styles.cardContainer}>
        {horarios.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              !item.disponivel ? styles.disabledCard : null,
              horarioSelecionado === item.id ? styles.selectedCard : null,
            ]}
            onPress={() => selecionarHorario(item.id)}
            disabled={!item.disponivel}
          >
            <Text style={styles.cardText}>{item.horario}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.text}>
          * Os horários disponíveis ficam em verde e os que não estão
          disponíveis ficam em vermelho
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: 300,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
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
  footerContainer: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  text: {
    color: '#ffffff',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#84fa84',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    margin: 5,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledCard: {
    backgroundColor: '#FF0000',
    color: '#fff',
  },
  selectedCard: {
    backgroundColor: '#FFFF00',
  },
  cardText: {
    color: '#000000',
  },
  logo: {
    width: '50%',
    height: '100%',
    objectFit: 'scale-down',
  },
});

export default DataDetailsScreen;
