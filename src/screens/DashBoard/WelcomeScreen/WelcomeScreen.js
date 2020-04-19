import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-elements';
import {connect, useDispatch} from 'react-redux';
import axios from 'axios';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {secondaryColor, primaryColor} from '../../../colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {GENERATE_EMAIL, GET_GENERATED_EMAILS} from '../../../../Apis';
import {ON_GENERATE_EMAIL} from '../../../actions/types';

function WelcomeScreen(props) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [generatedEmail, setGeneratedEmail] = useState(
    'Click to generate email',
  );

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      getGeneratedEmail();
    }, []),
  );

  const {token} = props.userReducer;

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
      setGeneratedEmail(`${emails.data.data.email_prefix}@quickout.app`);

      dispatch({
        type: ON_GENERATE_EMAIL,
        payload: `${emails.data.data.email_prefix}@quickout.app`,
      });

      console.log(emails.data.data.email_prefix, 'emailsData');
    } catch (error) {
      console.log(error, 'error');
      setLoading(false);
    }
  };

  // const getGeneratedEmail = async () => {
  //   if (props.userReducer.generatedEmail) {
  //     setGeneratedEmail(props.userReducer.generatedEmail);
  //   } else {
  //     try {
  //       const emails = await axios.get(GENERATE_EMAIL, {
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           Authorization: 'Bearer ' + token,
  //         },
  //       });

  //       // console.log(emails.data.data, 'emailData');

  //       if (emails.data.status) {
  //         setGeneratedEmail(`${emails.data.data.email_prefix}@quickout.app`);

  //         // dispatch({
  //         //   type: ON_GENERATE_EMAIL,
  //         //   payload: `${emails.data.data.email_prefix}@quickout.app`,
  //         // });
  //       } else {
  //         alert(emails.data.message);
  //       }

  //       setFetching(false);
  //       console.log(emails.data.data.email_prefix, 'emails');
  //     } catch (error) {
  //       console.log(error, 'response_fetching');
  //       setFetching(false);
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/home/welcome.png')}
        style={styles.background}>
        <View style={styles.buttonContainer}>
          <View style={styles.generateEmail}>
            <Text style={styles.generate}>
              {loading ? 'Generating..' : generatedEmail}
            </Text>
            {loading ? (
              <View style={styles.generateContainer}>
                <ActivityIndicator
                  color={primaryColor}
                  style={styles.generateText}
                />
              </View>
            ) : (
              generatedEmail.length <= 0 && (
                <TouchableOpacity
                  style={styles.generateContainer}
                  onPress={() => generateEmail()}>
                  <Text style={styles.generateText}> Generate </Text>
                </TouchableOpacity>
              )
            )}
          </View>
          <Button
            buttonStyle={styles.dashboardButton}
            title="Go To Dashboard"
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
