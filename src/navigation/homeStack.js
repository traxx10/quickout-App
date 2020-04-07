import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/DashBoard/WelcomeScreen/WelcomeScreen';
import HomeScreen from '../screens/DashBoard/HomeScreen/HomeScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// function DrawerStack() {
//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen
//         name="HomeScreen"
//         options={{drawerLabel: 'Home'}}
//         component={HomeScreen}
//       />
//       <Drawer.Screen
//         name="CalenderScreen"
//         options={{drawerLabel: 'Track Symptoms'}}
//         component={CalenderScreen}
//       />
//     </Drawer.Navigator>
//   );
// }

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
