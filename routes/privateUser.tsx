import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import HomeClient from "../screens/Client";
import Agendamento from "../screens/Client/Agendamento";

export default function PrivateUser() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          maxWidth: 430,
          maxHeight: 932,
        },
        headerShown: false,
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
      }}
      initialRouteName="HomeScreen"
    >
      <Stack.Screen name="HomeScreenPrivate" component={HomeClient} />
      <Stack.Screen name="AgendamentoScreenPrivate" component={Agendamento} />
    </Stack.Navigator>
  );
}
