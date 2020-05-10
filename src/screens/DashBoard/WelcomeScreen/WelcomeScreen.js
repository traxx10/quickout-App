import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import {connect, useDispatch} from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {secondaryColor, primaryColor} from '../../../colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {
  GENERATE_EMAIL,
  GET_GENERATED_EMAILS,
  CHECK_USER_EMAIL,
  WEB_HOOK_TOKEN,
  CREATE_USER_EMAIL,
} from '../../../../Apis';
import {
  ON_GENERATE_EMAIL,
  ON_CREATE_USER_EMAIL_SUCC,
} from '../../../actions/types';

function WelcomeScreen(props) {
  const [loading, setLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [valid, setValid] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [userRealEmail, setUserRealEmail] = useState(
    props.userReducer.userDetails[0].emailAddress,
  );
  const [hasEmail, setHasEmail] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      getGeneratedEmail();
      // checkEmail();
    }, []),
  );

  const {token, userDetails} = props.userReducer;

  const generateEmail = async (quickoutEmail, email_prefix, email_id) => {
    setLoading(true);
    try {
      const email = await axios.post(
        GENERATE_EMAIL,
        {
          quickoutEmail,
          email_prefix,
          email_id,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      if (email.data.status) {
        // alert(email.data.message);
        setGeneratedEmail(`${email.data.data.quickoutEmail}`);
        setGenerated(true);
        setValid(true);
        setHasEmail(true);
        dispatch({
          type: ON_GENERATE_EMAIL,
          payload: `${email.data.data.quickoutEmail}`,
        });
        dispatch({type: ON_CREATE_USER_EMAIL_SUCC, payload: email.data.data});
      } else {
        alert(email.data.message);
      }
      setLoading(false);
      console.log(email.data, 'email');
    } catch (error) {
      console.log(error, 'error_generating_email');
    }
  };

  // Get Generated Emails
  const getGeneratedEmail = async () => {
    setLoading(true);
    try {
      const emails = await axios.get(GET_GENERATED_EMAILS, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      if (!_.isEmpty(emails.data.data)) {
        setGeneratedEmail(`${emails.data.data.quickoutEmail}`);

        dispatch({
          type: ON_GENERATE_EMAIL,
          payload: `${emails.data.data.quickoutEmail}`,
        });
        dispatch({type: ON_CREATE_USER_EMAIL_SUCC, payload: emails.data.data});
        setGenerated(true);
        setLoading(false);
        setValid(true);
        setHasEmail(true);
      } else {
        checkEmail();
      }

      console.log(emails.data.data, 'emailsData');
    } catch (error) {
      console.log(error, 'error');
      setLoading(false);
    }
  };

  // If no generated email, check if user email is valid
  const checkEmail = async () => {
    setLoading(true);
    const matchEmail = /([^@]+)/;
    const matchedEmailRegex = matchEmail.exec(userDetails[0].emailAddress)[0];
    try {
      const {data} = await axios.post(
        `${CHECK_USER_EMAIL}?token=${WEB_HOOK_TOKEN}`,
        {
          emailAddress: userDetails[0].emailAddress,
        },
      );
      setLoading(false);
      setValid(false);
      setGeneratedEmail(`${matchedEmailRegex}`);
      console.log(data);

      if (data.AddressAvailable) {
        setGeneratedEmail(`${matchedEmailRegex}`);
        setValid(true);
      }
    } catch (error) {
      console.log(error.response, 'response');
      setLoading(false);
      setValid(false);
    }
  };

  // Generate Email is available
  const generateUserEmail = async (email) => {
    // quickoutEmail, email_prefix, email_id;
    const matchEmail = /([^@]+)/;
    const idPattern = /\d+/g;

    console.log(email, 'emaillllllll');

    setLoading(true);
    try {
      const {data} = await axios.post(
        `${CREATE_USER_EMAIL}?token=${WEB_HOOK_TOKEN}`,
        {
          emailAddress: userRealEmail,
          quickoutAddress: email,
        },
      );
      // setLoading(false);
      console.log(data, 'dataGenerate');

      if (!data.ParseurEmail) {
        setValid(false);
        setGenerated(false);
        setLoading(false);
        Alert.alert(
          'Quickout',
          'Email has already been taken, please try another one',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      } else {
        const matchedEmailRegex = matchEmail.exec(data.ParseurEmail);
        const emailPrefix = matchedEmailRegex[0];
        const matchedId = idPattern.exec(emailPrefix);
        const email_id = matchedId[0];
        generateEmail(data.UserQuickoutEmail, emailPrefix, email_id);

        // console.log(emailPrefix, email_id, 'matchedEmailRegex');
        // setValid(true);
        // dispatch({type: ON_CREATE_USER_EMAIL_SUCC, payload: data});
        // dispatch({
        //   type: ON_GENERATE_EMAIL,
        //   payload: data.UserQuickoutEmail,
        // });
      }
    } catch (error) {
      console.log(error, 'error');
      setLoading(false);
      setValid(false);
      setGenerated(false);
    }
  };

  // Parse Email
  const parseEmail = () => {
    let returnVal = '';
    if (!_.isEmpty(generatedEmail)) {
      const matchEmail = /([^@]+)/;
      const mail = matchEmail.exec(generatedEmail)[0];
      returnVal = mail;
    } else {
      returnVal = '';
    }

    console.log(returnVal);
    return returnVal;
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ImageBackground
          source={require('../../../assets/home/welcome.png')}
          style={styles.background}>
          <View style={[styles.buttonContainer]}>
            <View
              style={[
                styles.generateEmail,
                {
                  borderColor: loading ? '#fff' : valid ? 'green' : 'red',
                  borderWidth: 2,
                },
              ]}>
              <TextInput
                style={styles.generate}
                value={parseEmail()}
                onChangeText={async (val) => {
                  if (!loading) {
                    setGeneratedEmail(val);
                  }
                }}
                editable={!hasEmail}
                onBlur={() => {
                  // generateUserEmail(generatedEmail);
                }}
              />
              {loading ? (
                <View style={styles.generateContainer}>
                  <ActivityIndicator
                    color={primaryColor}
                    style={styles.generateText}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.generateContainer,
                    {borderColor: hasEmail ? '#ddd' : secondaryColor},
                  ]}
                  disabled={hasEmail}
                  onPress={() => {
                    generateUserEmail(`${generatedEmail}@quickout.app`);
                    // generateEmail();
                  }}>
                  <Text style={styles.generateText}> Generate </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.extensionContainer}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: RFPercentage(2.2),
                  fontWeight: '500',
                }}>
                @quickout.app
              </Text>
            </View>
            <Button
              buttonStyle={styles.dashboardButton}
              title="Go To Dashboard"
              disabled={
                loading || generatedEmail.length <= 0 || !valid || !generated
                  ? true
                  : false
              }
              titleStyle={styles.dashboardTitle}
              onPress={() => navigation.navigate('HomeScreen')}
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
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
  generateEmail: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  generateContainer: {
    borderColor: secondaryColor,
    borderWidth: 1.5,
    padding: 4,
    borderRadius: 5,
  },
  generateText: {
    color: secondaryColor,
    fontSize: RFPercentage(1.4),
  },
  generate: {
    color: '#8B8B8B',
    fontSize: RFPercentage(2.0),
  },
  dashboardButton: {
    backgroundColor: primaryColor,
    padding: 15,
  },
  loginTitle: {
    color: primaryColor,
    fontWeight: '600',
    fontSize: RFPercentage(2.2),
  },
  dashboardTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: RFPercentage(2.2),
  },
  extensionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 25,
  },
});

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(WelcomeScreen);
