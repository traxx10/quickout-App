import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import AuthStack from './authStack';
import HomeStack from './homeStack';

const Stack = createStackNavigator();

function AppStack(props) {
  const {loggedIn} = props.userReducer;

  return (
    <SafeAreaView style={styles.container}>
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
    // backgroundColor: primaryColor,
  },
});

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(AppStack);
