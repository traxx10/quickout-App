import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Input, Button} from 'react-native-elements';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ON_LOGIN_SUCC} from '../../actions/types';

function SignupScreen(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [medicalConditions, setMedicalConditions] = useState(['']);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const signup = () => {
    setLoading(true);

    setTimeout(() => {
      dispatch({
        type: ON_LOGIN_SUCC,
        payload: {
          userId: 'ID',
          userDetails: {
            email: email,
            age: age,
          },
        },
      });
      navigation.navigate('Home');
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Input
          placeholder="Email"
          leftIcon={
            <MaterialCommunityIcons
              name="email"
              size={24}
              color="black"
              style={styles.icon}
            />
          }
          onChangeText={text => setEmail(text)}
          value={email}
          inputStyle={styles.inputStyle}
          containerStyle={styles.inputContainer}
        />

        <Input
          secureTextEntry
          placeholder="Password"
          leftIcon={
            <MaterialCommunityIcons
              name="lock"
              size={24}
              color="black"
              style={styles.icon}
            />
          }
          value={password}
          onChangeText={text => setPassword(text)}
          inputStyle={styles.inputStyle}
          containerStyle={styles.inputContainer}
        />

        <Input
          placeholder="Age"
          leftIcon={
            <MaterialCommunityIcons
              name="account"
              size={24}
              color="black"
              style={styles.icon}
            />
          }
          value={age}
          onChangeText={text => setAge(`${text}`)}
          inputStyle={styles.inputStyle}
          containerStyle={styles.inputContainer}
          keyboardType="number-pad"
        />

        {/* <Input
          placeholder="Pre-Existing Medical Conditon(Optional)"
          leftIcon={
            <MaterialCommunityIcons
              name="account"
              size={24}
              color="black"
              style={styles.icon}
            />
          }
          value={age}
          onChangeText={text => setAge(`${text}`)}
          inputStyle={styles.inputStyle}
          containerStyle={styles.inputContainer}
        /> */}

        <Button
          loading={loading}
          title="Sign Up"
          buttonStyle={styles.buttonStyle}
          onPress={() => signup()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  inputContainer: {
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  buttonStyle: {
    marginTop: 15,
    backgroundColor: '#1DB0CF',
  },
  inputStyle: {
    fontSize: RFPercentage(1.7),
  },
});

export default SignupScreen;
