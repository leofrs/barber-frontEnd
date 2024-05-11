import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const DataDetailsScreen = ({ route }) => {
  const { dia, data, horarios } = route.params;
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

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
        <View style={styles.cardContainer}>
          {horarios.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.card,
                  horarioSelecionado === item.id ? styles.disabledCard : null,
                ]}
                onPress={() => selecionarHorario(item.id)}
              >
                <Text>{item.horario}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text>
          * Os horários disponiveis ficam em verde e os que não estão
          dísponiveis ficam em vermelho
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
  },
});

export default DataDetailsScreen;
