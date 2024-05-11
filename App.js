import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/pages/login';
import RegisterPage from './src/pages/register';
import UsersPage from './src/pages/users';
import AdminPage from './src/pages/admin';
import DataDetailsScreen from './src/pages/users/horarios/index';

import ContextProvider, { AuthContext } from './src/context/contextProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
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
                        title: 'Home',
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
                      name="Horarios"
                      component={DataDetailsScreen}
                      options={{
                        title: 'Horários',
                        headerTitleStyle: {
                          color: '#FFEFC7',
                        },
                        headerTitleAlign: 'center',

                        headerStyle: {
                          backgroundColor: '#000000',
                        },
                      }}
                    />
                    {isAdmin && (
                      <Stack.Screen
                        name="AdminHome"
                        component={AdminPage}
                        options={{
                          title: 'Admin Home',
                          headerTitleStyle: {
                            color: '#FFEFC7',
                          },
                          headerTitleAlign: 'center',

                          headerStyle: {
                            backgroundColor: '#000000',
                          },
                        }}
                      />
                    )}
                  </Stack.Navigator>
                </>
              ) : (
                <Stack.Navigator>
                  <Stack.Screen
                    name="Login"
                    component={LoginPage}
                    options={{
                      title: '',

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
const config = {
  animation: '',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
