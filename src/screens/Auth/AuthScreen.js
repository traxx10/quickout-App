import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {secondaryColor, primaryColor} from '../../colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';

function AuthScreen(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/auth/authScreen.png')}
        style={styles.background}>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.loginButton}
            title="Login"
            titleStyle={styles.loginTitle}
            onPress={() => navigation.navigate('LoginScreen')}
          />
          <Button
            buttonStyle={styles.signupButton}
            title="Sign up"
            titleStyle={styles.signupTitle}
            onPress={() => navigation.navigate('SignupScreen')}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    marginHorizontal: hp('5%'),
    marginVertical: hp('4%'),
  },
  loginButton: {
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 15,
  },
  signupButton: {
    backgroundColor: secondaryColor,
    padding: 15,
  },
  loginTitle: {color: primaryColor, fontWeight: '600', fontSize: RFValue(15)},
  signupTitle: {color: '#fff', fontWeight: '600', fontSize: RFValue(15)},
});

export default AuthScreen;
