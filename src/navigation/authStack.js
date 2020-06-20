import React from 'react';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from '../screens/Auth/AuthScreen';
import PasswordResetScreen from '../screens//Auth/PasswordResetScreen';
import PasswordTokenConfirmScreen from '../screens/Auth/PasswordTokenConfirmScreen';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />

      <Stack.Screen
        name="PasswordResetScreen"
        component={PasswordResetScreen}
      />
      <Stack.Screen
        name="PasswordTokenConfirm"
        component={PasswordTokenConfirmScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
