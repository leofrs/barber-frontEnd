import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert, scr } from 'react-native';
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
    <ScrollView
      horizontal={true}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <StatusBar hidden />
      <DataTable style={styles.containerTable}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.tableHeaderText}>
            Horario
          </DataTable.Title>
          <DataTable.Title style={styles.tableHeaderText}>
            Disponível
          </DataTable.Title>
          <DataTable.Title style={styles.tableHeaderText}>
            Cliente
          </DataTable.Title>
        </DataTable.Header>

        {horariosDisponiveis.map((item) => (
          <DataTable.Row key={item.id} style={{ borderColor: '#000' }}>
            <DataTable.Cell
              style={{
                width: '100%',
              }}
            >
              {item.horario}
            </DataTable.Cell>
            <DataTable.Cell
              style={{
                width: '100%',
              }}
            >
              {item.disponivel ? 'Sim' : 'Não'}
            </DataTable.Cell>
            <DataTable.Cell
              style={{
                width: '100%',
              }}
            >
              {item.userName}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerTable: {
    gap: 10,
    width: '100%',
  },
  tableHeader: {
    width: '100%',
    backgroundColor: '#DCDCDC',
  },
  tableHeaderText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableCell: {
    color: '#FFFFFF',
    textAlign: 'left',
  },
});
export default DataDetailsScreenAdmin;
