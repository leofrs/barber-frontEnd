import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  textContainer: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    width: 300,
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  cardContainer: {
    width: "100%",
    height: "70%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    borderColor: "#FFEFC7",
    borderTopStartRadius: 45,
    borderTopEndRadius: 45,
    backgroundColor: "#000000",
  },
  footerContainer: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  text: {
    color: "#ffffff",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#84fa84",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    margin: 5,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledCard: {
    backgroundColor: "#FF0000",
    color: "#fff",
  },
  selectedCard: {
    backgroundColor: "#FFFF00",
  },
  cardText: {
    color: "#000000",
  },
  logo: {
    width: "50%",
    height: "100%",
    objectFit: "scale-down",
  },
});
