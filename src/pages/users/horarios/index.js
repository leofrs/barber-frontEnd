import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DataDetailsScreen({ route }) {
  const { dia, data, manha, tarde } = route.params;
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 35, alignItems: 'center' }}>
        <Text>Dia: {dia}</Text>
        <Text>Data: {data}</Text>
      </View>
      <Text>Horários Manhã:</Text>
      <View style={styles.cardContainer}>
        {manha &&
          manha.map((horario) => (
            <View key={horario.id} style={[styles.card, styles.cardMargin]}>
              <Text>{horario.horarioManha}</Text>
            </View>
          ))}
      </View>
      <Text>Horários Tarde:</Text>
      <View style={styles.cardContainer}>
        {tarde &&
          tarde.map((horario) => (
            <View key={horario.id} style={[styles.card, styles.cardMargin]}>
              <Text>{horario.horarioTarde}</Text>
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
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
  cardMargin: {
    margin: 10, // Ajuste este valor para aumentar ou diminuir o espaçamento entre os cards
  },
});
