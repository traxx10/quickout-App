import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryColorLowOpacity,
  greyLight,
} from '../../../colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Input} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import validator from 'validator';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {SIGN_UP} from '../../../../Apis';
import {appStyles} from '../../../utils/styles';

function HowScreen({pagination}) {
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
    }
    // else if (!validator.isMobilePhone(mobileNumber)) {
    //   alert('Please provide a valid mobile number');
    // }
    else if (validator.isEmpty(password)) {
      alert('Password cannot be empty of less than 8 characters');
    } else {
      setLoading(true);
      try {
        const user = await axios.post(SIGN_UP, {
          emailAddress: `${email}`.toLowerCase(),
          password: password,
          // mobile: mobileNumber,
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={{flex: 1}}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../../../assets/auth/how.png')}
              style={styles.headerLogo}
              resizeMode={'contain'}
            />
          </View>
          <View style={[styles.formContainer, appStyles.shadows]}>
            <Text style={styles.headerText}> How?</Text>
            <Text style={styles.subtitle}>
              To use QuickOut we need to create a new email address, you use
              when making online purchases.
            </Text>
          </View>
          {pagination()}
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
    paddingVertical: 30,
    flex: 1.5,
  },
  headerLogo: {
    height: null,
    width: '100%',
    flex: 1,
  },
  formContainer: {
    flex: 1,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: primaryColorLowOpacity,
    paddingTop: 40,
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
    marginBottom: 19,
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

export default HowScreen;
