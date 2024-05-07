import FormRegister from './formRegister';
import { View } from 'react-native';

export default function RegisterPage({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <FormRegister navigation={navigation} />
    </View>
  );
}
