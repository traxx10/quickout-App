import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {secondaryColor, primaryColor} from '../../../colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';

function WelcomeScreen(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/home/welcome.png')}
        style={styles.background}>
        <View style={styles.buttonContainer}>
          <View
            style={styles.generateEmail}
            // onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={styles.generate}> test@test.com</Text>
            <TouchableOpacity style={styles.generateContainer}>
              <Text style={styles.generateText}> Generate </Text>
            </TouchableOpacity>
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
    fontSize: RFPercentage(2.2),
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

export default WelcomeScreen;
