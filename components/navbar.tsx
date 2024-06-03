import { useContext } from "react";
import { View, Alert, Button } from "react-native";
import { AuthContext } from "../context/contextProvider";

export default function NavBar({ navigation }: any) {
  //const { setUser } = useContext(AuthContext);

  /* const handleSair = () => {
    setUser(null);
    Alert.alert("Obrigado!", "Agradeço a sua preferência");
  }; */
  return (
    <View style={{ marginEnd: 35 }}>
      <Button title="Sair" color="red" />
    </View>
  );
}
