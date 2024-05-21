import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DataTable } from 'react-native-paper';

import { format } from 'date-fns';

import { AdminService } from '../../../../services/admin';
const adminService = new AdminService();

const DataDetailsScreenAdmin = ({ route }) => {
  const { dia, data, horarios } = route.params;
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  const formattedDate = format(new Date(data), 'dd/MM/yyyy');

  useEffect(() => {
    const fetchHorariosDisponiveis = async () => {
      try {
        const horariosDisponiveis = await Promise.all(
          horarios.map(async (horario) => {
            if (horario.userId) {
              try {
                const user = await adminService.getUserById(horario.userId);
                return { ...horario, userName: user.name };
              } catch (error) {
                console.error(
                  `Erro ao buscar usuário com ID ${horario.userId}:`,
                  error
                );
                return horario; // Retorne o horário original se houver um erro
              }
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
        <Text style={styles.text}>Data: {formattedDate}</Text>
      </View>
      <View style={styles.contentContainer}>
        <DataTable>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title
              style={{
                justifyContent: 'center',
              }}
            >
              Horário
            </DataTable.Title>
            <DataTable.Title
              style={{
                justifyContent: 'center',
              }}
            >
              Disponível
            </DataTable.Title>
            <DataTable.Title
              style={{
                justifyContent: 'center',
              }}
            >
              Cliente
            </DataTable.Title>
          </DataTable.Header>

          {horariosDisponiveis.map((item) => (
            <DataTable.Row key={item.id} style={{ borderColor: '#000' }}>
              <DataTable.Cell
                style={{
                  width: '100%',
                  backgroundColor: '#DCDCDC',
                  justifyContent: 'center',
                }}
              >
                {item.horario}
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  width: '100%',
                  backgroundColor: '#DCDCDC',
                  justifyContent: 'center',
                }}
              >
                {item.disponivel ? 'Sim' : 'Não'}
              </DataTable.Cell>
              <DataTable.Cell
                style={{
                  width: '100%',
                  backgroundColor: '#DCDCDC',

                  justifyContent: 'center',
                }}
              >
                {item.userName}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 20,
    paddingHorizontal: 55,
    backgroundColor: '#000',
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
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
  text: {
    color: '#fff',
    marginBottom: 10,
  },
});

export default DataDetailsScreenAdmin;
