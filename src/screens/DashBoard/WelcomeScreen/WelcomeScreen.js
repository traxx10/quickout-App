import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
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
  const [fetching, setFetching] = useState(true);
  const [generatedEmail, setGeneratedEmail] = useState(
    'Click to generate email',
  );
  const [matchedEmail, setMatchedEmail] = useState('');
  const [valid, setValid] = useState(true);
  const [generated, setGenerated] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      getGeneratedEmail();
      checkEmail();
    }, []),
  );

  const {token, userDetails} = props.userReducer;

  const generateEmail = async () => {
    setLoading(true);
    try {
      const email = await axios.get(GENERATE_EMAIL, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (email.data.status) {
        alert(email.data.message);
        setGeneratedEmail(`${email.data.data.email_prefix}@quickout.app`);
        dispatch({
          type: ON_GENERATE_EMAIL,
          payload: `${email.data.data.email_prefix}@quickout.app`,
        });
      } else {
        alert(email.data.message);
      }
      setLoading(false);
      console.log(email.data, 'email');
    } catch (error) {
      console.log(error, 'error_generating_email');
    }
  };

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

      setLoading(false);

      if (!_.isEmpty(emails.data.data)) {
        setGeneratedEmail(`${emails.data.data.email_prefix}@quickout.app`);

        dispatch({
          type: ON_GENERATE_EMAIL,
          payload: `${emails.data.data.email_prefix}@quickout.app`,
        });
      }

      console.log(emails.data.data, 'emailsData');
    } catch (error) {
      console.log(error, 'error');
      setLoading(false);
    }
  };

  const checkEmail = async () => {
    setLoading(true);
    const matchEmail = /([^@]+)/;
    const matchedEmailRegex = matchEmail.exec(userDetails[0].emailAddress)[0];
    setMatchedEmail(matchedEmailRegex);
    try {
      const {data} = await axios.post(
        `${CHECK_USER_EMAIL}?token=${WEB_HOOK_TOKEN}`,
        {
          emailAddress: userDetails[0].emailAddress,
        },
      );
      setLoading(false);
      setValid(false);
      setGeneratedEmail(`${matchedEmailRegex}@quickout.app`);
      console.log(data);

      if (data.AddressAvailable) {
        setGeneratedEmail(`${matchedEmailRegex}@quickout.app`);
        setValid(true);
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      setValid(false);
    }
  };

  const generateUserEmail = async (email) => {
    setLoading(true);
    try {
      const {data} = await axios.post(
        `${CREATE_USER_EMAIL}?token=${WEB_HOOK_TOKEN}`,
        {
          emailAddress: email,
        },
      );
      setLoading(false);
      console.log(data);

      if (!data.ParseurEmail) {
        setValid(false);
        setGenerated(false);
      } else {
        setValid(true);
        dispatch({type: ON_CREATE_USER_EMAIL_SUCC, payload: data});
        dispatch({
          type: ON_GENERATE_EMAIL,
          payload: data.UserQuickoutEmail,
        });
        setGenerated(true);
      }
    } catch (error) {
      console.log(error, 'error');
      setLoading(false);
      setValid(false);
      setGenerated(false);
    }
  };

  return (
    <View style={styles.container}>
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
              value={generatedEmail}
              onChangeText={async (val) => {
                if (!loading) {
                  if (_.isEmpty(val)) {
                    setGeneratedEmail(`@quickout.app`);
                  } else {
                    const matchEmail = /([^@]+)/;
                    const mail = matchEmail.exec(val)[0];
                    if (mail) {
                      setGeneratedEmail(`${mail}@quickout.app`);
                    }
                  }
                }
              }}
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
                style={styles.generateContainer}
                onPress={() => {
                  generateUserEmail(generatedEmail);
                }}
                // onPress={() => generateEmail()}
              >
                <Text style={styles.generateText}> Generate </Text>
              </TouchableOpacity>
            )}
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
    marginBottom: 25,
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
});

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(WelcomeScreen);
