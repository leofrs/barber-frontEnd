import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';

export function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 15 }}>
        Hello from home Screen
      </Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
