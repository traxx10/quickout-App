import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {primaryColor, secondaryColor} from '../../colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Input, Button} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';

function PasswordResetScreen(props) {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/auth/headerLogo.png')}
          style={styles.headerLogo}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}> Reset Password</Text>
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

        <Button
          buttonStyle={styles.loginButton}
          title="Reset"
          titleStyle={styles.loginTitle}
          // onPress={() => navigation.navigate('PasswordResetScreen')}
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

export default PasswordResetScreen;
