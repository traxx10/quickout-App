import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-elements';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {secondaryColor, primaryColor} from '../../../colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';

function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
        <ImageBackground
          style={styles.header}
          source={require('../../../assets/home/header.png')}>
          <View style={styles.navHeader}></View>
          <Text style={styles.headerText}> Dashboard </Text>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: hp('28%'),
    backgroundColor: secondaryColor,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#fff',
    fontSize: RFPercentage(3.2),
    fontWeight: '800',
  },
});

export default HomeScreen;
