import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CalenderScreen from '../screens/CalenderScreen/CalenderScreen';
import Symtoms from '../screens/Symptoms/Symptoms';

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
    <Stack.Navigator mode="modal" headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Symtomps" component={Symtoms} />
    </Stack.Navigator>
  );
}
