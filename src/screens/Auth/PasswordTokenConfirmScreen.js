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
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {ON_STATUS_BAR_CHANGE} from '../../actions/types';

function PasswordTokenConfirmScreen(props) {
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState([false, false, false]);

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
            source={require('../../assets/auth/passwordReset.png')}
            style={styles.headerLogo}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}> Reset Password</Text>
          <Text style={styles.subtitle}>
            Input the token we sent to your inbox and your new password
          </Text>
          <Input
            placeholder="Token"
            underlineColorAndroid="transparent"
            inputStyle={styles.input}
            placeholderTextColor={secondaryColor}
            value={email}
            onChangeText={(text) => setEmail(text)}
            inputContainerStyle={{borderColor: 'transparent'}}
            containerStyle={[
              styles.inputContainerStyle,
              {borderColor: focused[0] === true ? primaryColor : '#ddd'},
            ]}
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
                name="lock"
                size={24}
                color={secondaryColor}
                style={{marginTop: 2}}
              />
            }
          />

          <Input
            placeholder="New Password"
            underlineColorAndroid="transparent"
            inputStyle={styles.input}
            placeholderTextColor={secondaryColor}
            value={email}
            onChangeText={(text) => setEmail(text)}
            inputContainerStyle={{borderColor: 'transparent'}}
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
            leftIcon={
              <Feather
                name="lock"
                size={24}
                color={secondaryColor}
                style={{marginTop: 2}}
              />
            }
          />

          <Input
            placeholder="Repeat New Password"
            underlineColorAndroid="transparent"
            inputStyle={styles.input}
            placeholderTextColor={secondaryColor}
            value={email}
            onChangeText={(text) => setEmail(text)}
            inputContainerStyle={{borderColor: 'transparent'}}
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
            title="Reset Password"
            titleStyle={styles.loginTitle}
            // onPress={() => navigation.navigate('PasswordTokenConfirmScreen')}
          />

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => {
              navigation.goBack();
            }}>
            <View style={styles.borderText}>
              <Text style={styles.forgotPasswordText}> Back to Login </Text>
            </View>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLogo: {
    height: 180,
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
    textAlign: 'center',
    marginBottom: 35,
    fontSize: RFPercentage(2.2),
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginBottom: 35,
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

export default PasswordTokenConfirmScreen;
