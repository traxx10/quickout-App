import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './authStack';
import HomeStack from './homeStack';
import {primaryColor} from '../colors';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Home" component={HomeStack} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: primaryColor,
  },
});

export default AppStack;
