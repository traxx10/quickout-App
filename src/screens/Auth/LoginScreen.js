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
import {primaryColor, secondaryColor} from '../../colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Input, Button} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import qs from 'qs';
import validator from 'validator';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {SIGN_IN} from '../../../Apis';
import {ON_LOGIN_SUCC, ON_STATUS_BAR_CHANGE} from '../../actions/types';

function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ON_STATUS_BAR_CHANGE,
      payload: primaryColor,
    });
  }, []);

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
            <Text style={styles.headerText}> Welcome Back</Text>
            <Text style={styles.subtitle}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
            <Input
              placeholder="Email Address"
              underlineColorAndroid="transparent"
              containerStyle={styles.inputContainerStyle}
              inputStyle={styles.input}
              placeholderTextColor={secondaryColor}
              value={email}
              onChangeText={(text) => setEmail(text)}
              inputContainerStyle={{borderColor: 'transparent'}}
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
              containerStyle={styles.inputContainerStyle}
              inputStyle={styles.input}
              placeholderTextColor={secondaryColor}
              value={password}
              onChangeText={(text) => setPassword(text)}
              inputContainerStyle={{borderColor: 'transparent'}}
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
              <View style={styles.borderText}>
                <Text style={styles.forgotPasswordText}>
                  {' '}
                  Forgot Password?{' '}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.orContainer}>
              <View style={styles.orBorderLeft} />
              <Text style={styles.orText}> OR</Text>
              <View style={styles.orBorderRight} />
            </View>

            <Button
              icon={
                <AntDesign
                  name="google"
                  size={27}
                  color="#8B8B8B"
                  style={{marginRight: 10, marginTop: 5}}
                />
              }
              title="Login With Google"
              buttonStyle={styles.googleButton}
              titleStyle={styles.googleButtonTitle}
            />

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
    backgroundColor: primaryColor,
    paddingTop: hp('4%'),
    paddingHorizontal: 25,
  },
  headerText: {
    fontSize: RFPercentage(4),
    color: '#fff',
    fontWeight: '800',
    marginBottom: 7,
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    marginBottom: hp('4%'),
    fontSize: RFPercentage(1.8),
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingVertical: 5,
  },
  input: {
    fontSize: RFPercentage(2.2),
    color: secondaryColor,
    paddingLeft: 15,
  },
  loginButton: {
    marginBottom: 15,
    backgroundColor: secondaryColor,
    padding: 15,
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
    color: '#fff',
    fontWeight: '400',
  },
  borderText: {
    borderBottomWidth: 0.8,
    paddingBottom: 2,
    borderColor: '#fff',
  },
  orContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    marginBottom: 15,
  },
  orText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: RFPercentage(2),
    marginHorizontal: 5,
  },
  orBorderLeft: {
    height: 1.5,
    backgroundColor: '#BE5E06',
    flex: 1,
  },
  orBorderRight: {
    height: 1.5,
    backgroundColor: '#BE5E06',
    flex: 1,
  },
  googleButton: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    paddingVertical: 8,
  },
  googleButtonTitle: {
    color: '#8B8B8B',
    fontWeight: '600',
    fontSize: RFPercentage(2.2),
  },
});

export default LoginScreen;
