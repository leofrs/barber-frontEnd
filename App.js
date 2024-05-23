import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContextProvider, { AuthContext } from './src/context/contextProvider';
import HomePage from './src/pages/home';
import LoginPage from './src/pages/login';
import RegisterPage from './src/pages/register';
import UsersPage from './src/pages/users';
import AdminPage from './src/pages/admin';
import DataDetailsScreen from './src/pages/users/horarios/index';
import DataDetailsScreenAdmin from './src/pages/admin/agenda/horarios/index';
import UsersDetalilsScreen from './src/pages/admin/clients';
import { HorariosMarcados } from './src/pages/admin/agenda';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer independent={true}>
        <AuthContext.Consumer>
          {({ user, isAdmin }) => (
            <>
              {user ? (
                <>
                  <Stack.Navigator>
                    <Stack.Screen
                      name="HomeUser"
                      component={UsersPage}
                      options={{
                        headerShown: false,
                        fullScreenGestureEnabled: false,
                      }}
                    />
                    <Stack.Screen
                      name="Horarios"
                      component={DataDetailsScreen}
                      options={{
                        headerShown: false,
                        fullScreenGestureEnabled: false,
                      }}
                    />
                    {isAdmin && (
                      <>
                        <Stack.Screen
                          name="AdminHome"
                          component={AdminPage}
                          options={{
                            headerShown: false,
                            fullScreenGestureEnabled: false,
                          }}
                        />
                        <Stack.Screen
                          name="Clients"
                          component={UsersDetalilsScreen}
                          options={{
                            headerShown: false,
                            fullScreenGestureEnabled: false,
                          }}
                        />
                        <Stack.Screen
                          name="Agenda"
                          component={HorariosMarcados}
                          options={{
                            headerShown: false,
                            fullScreenGestureEnabled: false,
                          }}
                        />
                        <Stack.Screen
                          name="HorariosAdmin"
                          component={DataDetailsScreenAdmin}
                          options={{
                            headerShown: false,
                            fullScreenGestureEnabled: false,
                          }}
                        />
                      </>
                    )}
                  </Stack.Navigator>
                </>
              ) : (
                <Stack.Navigator>
                  <Stack.Screen
                    name="Home"
                    component={HomePage}
                    options={{
                      headerShown: false,
                      fullScreenGestureEnabled: false,
                    }}
                  />
                  <Stack.Screen
                    name="Login"
                    component={LoginPage}
                    options={{
                      headerShown: false,
                      fullScreenGestureEnabled: false,
                    }}
                  />
                  <Stack.Screen
                    name="Cadastro"
                    component={RegisterPage}
                    options={{
                      headerShown: false,
                      fullScreenGestureEnabled: false,
                    }}
                  />
                </Stack.Navigator>
              )}
            </>
          )}
        </AuthContext.Consumer>
      </NavigationContainer>
    </ContextProvider>
  );
}
