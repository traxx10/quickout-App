import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryColorLowOpacity,
  greyLight,
} from '../../colors';
import {Button} from 'react-native-elements';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {ON_STATUS_BAR_CHANGE} from '../../actions/types';
import {appStyles} from '../../utils/styles';

function AuthScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch({
        type: ON_STATUS_BAR_CHANGE,
        payload: primaryColorLowOpacity,
      });
    }, []),
  );

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/auth/auth.png')}
            style={styles.headerLogo}
            resizeMode={'contain'}
          />
        </View>
        <View style={[styles.formContainer, appStyles.shadows]}>
          <Text style={styles.headerText}> Welcome</Text>
          <Text style={styles.subtitle}>
            Simplify online shopping with one place to see updates on all your
            online purchases Go through these few steps to get started
          </Text>

          <Button
            buttonStyle={[styles.loginButton, appStyles.buttonShadows]}
            title="New User"
            titleStyle={styles.loginTitle}
            disabledStyle={{backgroundColor: secondaryColor}}
            onPress={() =>
              navigation.navigate('Home', {screen: 'OnBoardingScreen'})
            }
          />

          <Button
            buttonStyle={[styles.loginButton, appStyles.buttonShadows]}
            title="Existing User"
            titleStyle={styles.loginTitle}
            disabledStyle={{backgroundColor: secondaryColor}}
            onPress={() => navigation.navigate('LoginScreen')}
          />

          <View style={styles.forgotPasswordContainer}>
            <View style={[styles.borderText, {borderBottomWidth: 0}]}>
              <Text style={styles.forgotPasswordText}>
                By signing up, you agree to our
                <Text style={styles.focusedText} onPress={() => alert('here')}>
                  {` Terms of Service `}
                </Text>
                and
                <Text style={styles.focusedText}>{` Privacy Policy`}</Text>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 1,
    paddingVertical: 30,
  },
  headerLogo: {
    height: null,
    width: '100%',
    flex: 1,
  },
  formContainer: {
    flex: 2,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: primaryColorLowOpacity,
    paddingTop: 40,
    paddingHorizontal: 25,
  },
  headerText: {
    fontSize: RFPercentage(4),
    color: secondaryColor,
    fontWeight: '800',
    marginBottom: 19,
    textAlign: 'center',
  },
  subtitle: {
    color: greyLight,
    marginBottom: 35,
    fontSize: RFPercentage(2.2),
    textAlign: 'center',
  },

  loginButton: {
    marginBottom: 25,
    backgroundColor: primaryColor,
    padding: 15,
    paddingVertical: 17,
    borderRadius: 50,
  },
  loginTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: RFPercentage(2.2),
  },
  signUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    flexDirection: 'row',
  },
  forgotPasswordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: greyLight,
    fontWeight: '400',
    textAlign: 'center',
    fontSize: RFPercentage(2),
  },
  borderText: {
    borderBottomWidth: 0.8,
    paddingBottom: 2,
    borderColor: greyLight,
  },
  focusedText: {
    borderBottomWidth: 1,
    fontWeight: '600',
  },
});

export default AuthScreen;
