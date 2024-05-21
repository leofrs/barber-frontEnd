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
                      }}
                    />
                    <Stack.Screen
                      name="Horarios"
                      component={DataDetailsScreen}
                      options={{
                        headerShown: false,
                      }}
                    />
                    {isAdmin && (
                      <>
                        <Stack.Screen
                          name="AdminHome"
                          component={AdminPage}
                          options={{
                            title: 'Admin Home',
                            headerTintColor: '#000',
                            headerTitleStyle: {
                              color: '#FFEFC7',
                              fontWeight: 'bold',
                            },
                            headerTitleAlign: 'center',

                            headerStyle: {
                              backgroundColor: '#000000',
                            },
                          }}
                        />
                        <Stack.Screen
                          name="Clients"
                          component={UsersDetalilsScreen}
                          options={{
                            title: 'Clientes',
                            headerTintColor: '#FFEFC7',
                            headerTitleStyle: {
                              color: '#FFEFC7',
                            },
                            headerTitleAlign: 'center',
                            headerStyle: {
                              backgroundColor: '#000000',
                            },
                          }}
                        />
                        <Stack.Screen
                          name="Agenda"
                          component={HorariosMarcados}
                          options={{
                            title: 'Agenda',
                            headerTintColor: '#FFEFC7',
                            headerTitleStyle: {
                              color: '#FFEFC7',
                            },
                            headerTitleAlign: 'center',
                            headerStyle: {
                              backgroundColor: '#000000',
                            },
                          }}
                        />
                        <Stack.Screen
                          name="HorariosAdmin"
                          component={DataDetailsScreenAdmin}
                          options={{
                            title: 'Horários',
                            headerTintColor: '#FFEFC7',
                            headerTitleStyle: {
                              color: '#FFEFC7',
                            },
                            headerTitleAlign: 'center',
                            headerStyle: {
                              backgroundColor: '#000000',
                            },
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
                    }}
                  />
                  <Stack.Screen
                    name="Login"
                    component={LoginPage}
                    options={{
                      title: 'Home',

                      headerTitleStyle: {
                        color: '#FFEFC7',
                      },
                      headerTintColor: '#FFEFC7',
                      headerStyle: {
                        backgroundColor: '#000000',
                      },
                    }}
                  />
                  <Stack.Screen
                    name="Cadastro"
                    component={RegisterPage}
                    options={{
                      title: 'Login',
                      headerTitleStyle: {
                        color: '#FFEFC7',
                      },
                      headerTintColor: '#FFEFC7',
                      headerStyle: {
                        backgroundColor: '#000000',
                      },
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
