import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { UserService } from '../../../services/user';
import { AuthContext } from '../../../context/contextProvider';
import { format } from 'date-fns';

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
      <View style={styles.textContainer}>
        <Text style={styles.text}>Dia: {dia}</Text>
        <Text style={styles.text}>Data: {formattedDate}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Horários disponíveis:</Text>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: '#000000',
    paddingHorizontal: 55,
  },
  textContainer: {
    maxWidth: 300,
    height: 'auto',
    marginBottom: 55,
    alignItems: 'center',
  },
  contentContainer: {
    width: 300,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  footerContainer: {
    maxWidth: 300,
    height: 'auto',
    marginBottom: 25,
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
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
});

export default DataDetailsScreen;
