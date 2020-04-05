import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {primaryColor} from '../../colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Input} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import {RFPercentage} from 'react-native-responsive-fontsize';

function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          leftIcon={<Feather name="mail" size={24} color={primaryColor} />}
        />
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
    marginBottom: 7,
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  input: {
    fontSize: RFPercentage(5),
  },
});

export default LoginScreen;
