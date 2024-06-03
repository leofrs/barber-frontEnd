import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    gap: 25,
    marginTop: 60,
  },
  buttons: {
    borderWidth: 2,
    borderColor: "#FFEFC7",
    width: 200,
    alignItems: "center",
    borderRadius: 25,
    padding: 5,
    backgroundColor: "#FFEFC7",
  },
  footerContainer: {
    width: "100%",
    position: "absolute",
    bottom: 15,
  },
});
