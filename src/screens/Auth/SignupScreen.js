import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {primaryColor, secondaryColor} from '../../colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Input, Button} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import validator from 'validator';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {SIGN_UP} from '../../../Apis';
import {ON_LOGIN_SUCC} from '../../actions/types';

function SignupScreen(props) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState([false, false, false, false, false]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const signup = async () => {
    if (!validator.isEmail(email)) {
      alert('Please provide a valid email address');
    } else if (validator.isEmpty(firstName)) {
      alert('Please provide a first name');
    } else if (validator.isEmpty(lastName)) {
      alert('Please provide a last name');
    } else if (!validator.isMobilePhone(mobileNumber)) {
      alert('Please provide a valid mobile number');
    } else if (validator.isEmpty(password) || password.length < 8) {
      alert('Password cannot be empty of less than 8 characters');
    } else {
      setLoading(true);
      try {
        const user = await axios.post(SIGN_UP, {
          emailAddress: `${email}`.toLowerCase(),
          password: password,
          mobile: mobileNumber,
          firstName: firstName,
          lastName: lastName,
        });

        if (user.data.status) {
          alert(user.data.message);
          // dispatch({
          //   type: ON_LOGIN_SUCC,
          //   payload: {
          //     userId: user.data.userData._id,
          //     userDetails: user.data.userData,
          //   },
          // });
          // navigation.navigate('Home', {screen: 'WelcomeScreen'});
        } else {
          alert(user.data.message);
        }
        setLoading(false);
      } catch (error) {
        console.log(error, 'error');
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
        <View style={styles.formContainer}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}> Sign Up</Text>
            <Text style={styles.subtitle}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
          </View>
          <View style={styles.formItem}>
            <Input
              placeholder="First Name"
              underlineColorAndroid="transparent"
              containerStyle={[
                styles.inputContainerStyle,
                {borderColor: focused[0] === true ? primaryColor : '#ddd'},
              ]}
              inputStyle={styles.input}
              placeholderTextColor="#D5D5D5"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
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
                  name="user"
                  size={24}
                  color={secondaryColor}
                  style={{marginTop: 2}}
                />
              }
            />

            <Input
              placeholder="Last Name"
              underlineColorAndroid="transparent"
              containerStyle={[
                styles.inputContainerStyle,
                {borderColor: focused[1] === true ? primaryColor : '#ddd'},
              ]}
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
              inputStyle={styles.input}
              placeholderTextColor="#D5D5D5"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              inputContainerStyle={{borderColor: 'transparent'}}
              leftIcon={
                <Feather
                  name="user"
                  size={24}
                  color={secondaryColor}
                  style={{marginTop: 2}}
                />
              }
            />

            <Input
              placeholder="Email Address"
              underlineColorAndroid="transparent"
              containerStyle={[
                styles.inputContainerStyle,
                {borderColor: focused[2] === true ? primaryColor : '#ddd'},
              ]}
              onFocus={() => {
                let prevFocus = [...focused];
                prevFocus[2] = true;
                setFocused(prevFocus);
              }}
              onBlur={() => {
                let prevFocus = [...focused];
                prevFocus[2] = false;
                setFocused(prevFocus);
              }}
              inputStyle={styles.input}
              placeholderTextColor="#D5D5D5"
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
              placeholder="Phone number"
              underlineColorAndroid="transparent"
              containerStyle={[
                styles.inputContainerStyle,
                {borderColor: focused[3] === true ? primaryColor : '#ddd'},
              ]}
              onFocus={() => {
                let prevFocus = [...focused];
                prevFocus[3] = true;
                setFocused(prevFocus);
              }}
              onBlur={() => {
                let prevFocus = [...focused];
                prevFocus[3] = false;
                setFocused(prevFocus);
              }}
              inputStyle={styles.input}
              placeholderTextColor="#D5D5D5"
              value={mobileNumber}
              onChangeText={(text) => setMobileNumber(text)}
              inputContainerStyle={{borderColor: 'transparent'}}
              leftIcon={
                <Feather
                  name="phone"
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
                {borderColor: focused[4] === true ? primaryColor : '#ddd'},
              ]}
              onFocus={() => {
                let prevFocus = [...focused];
                prevFocus[4] = true;
                setFocused(prevFocus);
              }}
              onBlur={() => {
                let prevFocus = [...focused];
                prevFocus[4] = false;
                setFocused(prevFocus);
              }}
              inputStyle={styles.input}
              placeholderTextColor="#D5D5D5"
              value={password}
              onChangeText={(text) => setPassword(text)}
              inputContainerStyle={{
                borderColor: 'transparent',
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
              buttonStyle={styles.signupButton}
              title="Sign Up"
              titleStyle={styles.signupTitle}
              onPress={() => signup()}
              disabled={loading}
              loading={loading}
              disabledStyle={{backgroundColor: primaryColor}}
            />

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
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.forgotPasswordText}>
                Already have an account?
              </Text>

              <View style={[styles.borderText, {marginLeft: 5}]}>
                <Text style={[styles.forgotPasswordText, {fontWeight: '600'}]}>
                  Login
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    paddingTop: hp('4%'),
    paddingHorizontal: 25,
  },

  formItem: {
    marginHorizontal: 8,
  },

  headerTextContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: hp('3%'),
    paddingTop: hp('3%'),
  },
  headerText: {
    fontSize: RFPercentage(4),
    color: secondaryColor,
    fontWeight: '800',
    marginBottom: 7,
  },
  subtitle: {
    color: '#B9B9B9',
    fontSize: RFPercentage(1.8),
    marginLeft: 8,
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    marginBottom: hp('3%'),
    paddingVertical: 5,
    borderColor: '#ddd',
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    fontSize: RFPercentage(2.2),
    color: secondaryColor,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  signupButton: {
    backgroundColor: primaryColor,
    padding: 15,
  },
  signupTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: RFPercentage(2.2),
  },
  signUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  forgotPasswordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: '#575151',
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
    marginVertical: 20,
  },
  orText: {
    color: primaryColor,
    fontWeight: '600',
    fontSize: RFPercentage(2),
    marginHorizontal: 5,
  },
  orBorderLeft: {
    height: 1.5,
    backgroundColor: '#EEEEEE',
    flex: 1,
  },
  orBorderRight: {
    height: 1.5,
    backgroundColor: '#EEEEEE',
    flex: 1,
  },
  googleButton: {
    marginBottom: 20,
    backgroundColor: '#EEEEEE',
    padding: 15,
    paddingVertical: 8,
  },
  googleButtonTitle: {
    color: '#8B8B8B',
    fontWeight: '600',
    fontSize: RFPercentage(2.2),
  },
});

export default SignupScreen;
