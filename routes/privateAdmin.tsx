import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { HomeAdmin } from "../screens/Admin/Home";
import { AgendaAdmin } from "../screens/Admin/Agenda";
import { ClientsAdmin } from "../screens/Admin/Clients";
import { HorariosAdmin } from "../screens/Admin/Agenda/Horarios";
import ClientScreen from "../screens/Client";

export default function PrivateAdmin() {
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
      <Stack.Screen name="HomeScreen" component={HomeAdmin} />
      <Stack.Screen name="AgendaAdminScreen" component={AgendaAdmin} />
      <Stack.Screen name="ClientsaAdminScreen" component={ClientsAdmin} />
      <Stack.Screen name="HorariosAdminScreen" component={HorariosAdmin} />
    </Stack.Navigator>
  );
}
