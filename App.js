import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/pages/login';
import RegisterPage from './src/pages/register';
import UsersPage from './src/pages/users';
import AdminPage from './src/pages/admin';
import DataDetailsScreen from './src/pages/users/horarios/index';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Cadastro" component={RegisterPage} />

        <Stack.Screen name="Home" component={UsersPage} />
        {/* <Stack.Screen name="Home" component={AdminPage} /> */}
        <Stack.Screen name="Horários" component={DataDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
