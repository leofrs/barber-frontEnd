import FormLogin from './formLogin';
import { View } from 'react-native';

export default function LoginPage({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <FormLogin navigation={navigation} />
    </View>
  );
}
