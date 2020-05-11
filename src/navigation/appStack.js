import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import AuthStack from './authStack';
import HomeStack from './homeStack';
import {primaryColor} from '../colors';

const Stack = createStackNavigator();

function AppStack(props) {
  const {loggedIn} = props.userReducer;
  const {statusBarColor} = props;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: statusBarColor}]}>
      <StatusBar barStyle="light-content" backgroundColor={statusBarColor} />
      <Stack.Navigator
        headerMode="none"
        initialRouteName={loggedIn ? 'Home' : 'Auth'}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Home" component={HomeStack} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },
});

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
    statusBarColor: state.appReducer.statusBarColor,
  };
};

export default connect(mapStateToProps)(AppStack);
