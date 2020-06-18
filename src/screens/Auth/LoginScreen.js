import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryColorLowOpacity,
  greyLight,
} from '../../colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Input, Button} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import qs from 'qs';
import validator from 'validator';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {SIGN_IN} from '../../../Apis';
import {ON_LOGIN_SUCC, ON_STATUS_BAR_CHANGE} from '../../actions/types';

function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState([false, false]);

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

  const login = async () => {
    if (!validator.isEmail(email)) {
      alert('Please provide a valid email address');
    } else if (validator.isEmpty(password)) {
      alert('Password cannot be empty ');
    } else {
      setLoading(true);
      try {
        const user = await axios.put(
          SIGN_IN,
          qs.stringify({
            emailAddress: `${email}`.toLowerCase(),
            password: password,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        );
        console.log(user.data, 'log in succ');
        if (user.data.status) {
          // alert(user.data.message);
          dispatch({
            type: ON_LOGIN_SUCC,
            payload: {
              userDetails: user.data.userData,
              token: user.data.token,
              loginId: user.data.loginId,
            },
          });
          navigation.navigate('Home', {screen: 'WelcomeScreen'});
        } else {
          alert(user.data.message);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.response, 'error');
        setLoading(false);
      }
    }
  };

  console.log(focused, 'focused');

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../../assets/auth/headerLogo.png')}
              style={styles.headerLogo}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.headerText}> Login</Text>
            <Text style={styles.subtitle}>
              Input email and password to get going
            </Text>
            <Input
              placeholder="Email Address"
              underlineColorAndroid="transparent"
              containerStyle={[
                styles.inputContainerStyle,
                {borderColor: focused[0] === true ? primaryColor : '#ddd'},
              ]}
              inputStyle={styles.input}
              placeholderTextColor={secondaryColor}
              value={email}
              onChangeText={(text) => setEmail(text)}
              inputContainerStyle={{borderColor: 'transparent'}}
              onFocus={() => {
                let prevFocus = [...focused];
                prevFocus[0] = true;
                setFocused(prevFocus);
              }}
              onBlur={() => {
                let prevFocus = [...focused];
                prevFocus[0] = false;
                setFocused(prevFocus);
              }}
              leftIcon={
                <Feather
                  name="mail"
                  size={24}
                  color={secondaryColor}
                  style={{marginTop: 2}}
                />
              }
            />

            <Input
              placeholder="Password"
              underlineColorAndroid="transparent"
              secureTextEntry
              containerStyle={[
                styles.inputContainerStyle,
                {borderColor: focused[1] === true ? primaryColor : '#ddd'},
              ]}
              inputStyle={styles.input}
              placeholderTextColor={secondaryColor}
              value={password}
              onChangeText={(text) => setPassword(text)}
              inputContainerStyle={{borderColor: 'transparent'}}
              onFocus={() => {
                let prevFocus = [...focused];
                prevFocus[1] = true;
                setFocused(prevFocus);
              }}
              onBlur={() => {
                let prevFocus = [...focused];
                prevFocus[1] = false;
                setFocused(prevFocus);
              }}
              leftIcon={
                <Feather
                  name="lock"
                  size={24}
                  color={secondaryColor}
                  style={{marginTop: 2}}
                />
              }
            />

            <Button
              buttonStyle={styles.loginButton}
              title="Login"
              titleStyle={styles.loginTitle}
              disabled={loading}
              loading={loading}
              disabledStyle={{backgroundColor: secondaryColor}}
              onPress={() => login()}
            />

            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => {
                navigation.navigate('PasswordResetScreen');
              }}>
              <View style={[styles.borderText, {borderBottomWidth: 0}]}>
                <Text style={styles.forgotPasswordText}>
                  Forgot password?
                  <Text
                    style={{
                      borderBottomWidth: 1,
                      fontWeight: '600',
                    }}>
                    {` Reset password`}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.orContainer}>
              <View style={styles.orBorderLeft} />
              <Text style={styles.orText}> OR</Text>
              <View style={styles.orBorderRight} />
            </View>

            <TouchableOpacity
              style={styles.signUpContainer}
              onPress={() => navigation.navigate('SignupScreen')}>
              <Text style={styles.forgotPasswordText}>
                Don't have an account?
              </Text>

              <View style={[styles.borderText, {marginLeft: 5}]}>
                <Text style={[styles.forgotPasswordText, {fontWeight: '600'}]}>
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('5%'),
  },
  headerLogo: {
    height: hp('12%'),
    width: '100%',
  },
  formContainer: {
    flex: 2.5,
    borderTopLeftRadius: 60,
    backgroundColor: primaryColorLowOpacity,
    paddingTop: hp('4%'),
    paddingHorizontal: 25,
  },
  headerText: {
    fontSize: RFPercentage(4),
    color: secondaryColor,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: greyLight,
    marginBottom: 35,
    fontSize: RFPercentage(2.2),
    textAlign: 'center',
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    marginBottom: 35,
    paddingVertical: 10,
    borderWidth: 1,
  },
  input: {
    fontSize: RFPercentage(2.2),
    color: secondaryColor,
    paddingLeft: 15,
  },
  loginButton: {
    marginBottom: 15,
    backgroundColor: primaryColor,
    padding: 15,
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
  },
  borderText: {
    borderBottomWidth: 0.8,
    paddingBottom: 2,
    borderColor: greyLight,
  },
  orContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    marginBottom: 15,
  },
  orText: {
    color: greyLight,
    fontWeight: '600',
    fontSize: RFPercentage(2),
    marginHorizontal: 5,
  },
  orBorderLeft: {
    height: 1.5,
    backgroundColor: greyLight,
    flex: 1,
  },
  orBorderRight: {
    height: 1.5,
    backgroundColor: greyLight,
    flex: 1,
  },
  googleButton: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    paddingVertical: 8,
  },
  googleButtonTitle: {
    color: greyLight,
    fontWeight: '600',
    fontSize: RFPercentage(2.2),
  },
});

export default LoginScreen;
