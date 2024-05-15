import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DataTable } from 'react-native-paper';

import { AdminService } from '../../../../services/admin';
const adminService = new AdminService();

const DataDetailsScreenAdmin = ({ route }) => {
  const { dia, data, horarios } = route.params;
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  useEffect(() => {
    const fetchHorariosDisponiveis = async () => {
      try {
        const horariosDisponiveis = await Promise.all(
          horarios.map(async (horario) => {
            if (horario.userId) {
              const user = await adminService.getUserById(horario.userId);
              return { ...horario, userName: user.name };
            } else {
              return horario;
            }
          })
        );
        setHorariosDisponiveis(horariosDisponiveis);
      } catch (error) {
        console.error('Erro ao buscar os horários disponíveis:', error);
      }
    };

    fetchHorariosDisponiveis();
  }, [horarios]);

  const selecionarHorario = (id) => {
    if (horarioSelecionado === id) {
      Alert.alert('Atenção!', 'Este horário já foi selecionado.');
    } else {
      setHorarioSelecionado(id);
      Alert.alert('Sucesso!', 'Seu horário foi marcado');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Dia: {dia}</Text>
        <Text style={styles.text}>Data: {data}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Horários disponíveis:</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Horário</DataTable.Title>
            <DataTable.Title>Disponível</DataTable.Title>
            <DataTable.Title>Usuário</DataTable.Title>
          </DataTable.Header>

          {horariosDisponiveis.map((item) => (
            <DataTable.Row
              key={item.id}
              onPress={() => selecionarHorario(item.id)}
              style={
                horarioSelecionado === item.id ? styles.disabledCard : null
              }
            >
              <DataTable.Cell>{item.horario}</DataTable.Cell>
              <DataTable.Cell>{item.disponivel ? 'Sim' : 'Não'}</DataTable.Cell>
              <DataTable.Cell>{item.userName}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
      <View style={styles.footerContainer}>
        <Text>
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
    color: '#fff',
  },
  text: {
    color: '#000',
    marginBottom: 10,
  },
  disabledCard: {
    backgroundColor: '#FF0000',
  },
});

export default DataDetailsScreenAdmin;
