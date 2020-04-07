import * as React from 'react';
import {connect} from 'react-redux';
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

function HomeStack(props) {
  const {generatedEmail} = props.userReducer;

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={generatedEmail ? 'HomeScreen' : 'WelcomeScreen'}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(HomeStack);
