import { View, Text, StyleSheet } from "react-native";

export const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        O horário da próxima semana é liberado toda sexta a noite
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 230,
    backgroundColor: "#000000",
  },
  text: {
    color: "#ffffff",
    textAlign: "center",
    position: "absolute",
    bottom: 30,
    left: "6%",
  },
});
