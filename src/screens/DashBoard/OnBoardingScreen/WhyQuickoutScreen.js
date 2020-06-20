import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  primaryColor,
  secondaryColor,
  primaryColorLowOpacity,
  greyLight,
} from '../../../colors';
import {Button} from 'react-native-elements';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {ON_STATUS_BAR_CHANGE} from '../../../actions/types';
import {appStyles} from '../../../utils/styles';

function WhyQuickoutScreen({pagination}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../../assets/auth/whyQuickout.png')}
            style={styles.headerLogo}
            resizeMode={'contain'}
          />
        </View>
        <View style={[styles.formContainer, appStyles.shadows]}>
          <Text style={styles.headerText}> Why Quickout</Text>
          <Text style={styles.subtitle}>
            Stop wasting time looking through emails every time you need an
            overview of your purchases and their status
          </Text>
        </View>
        {pagination()}
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
    paddingVertical: 30,
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
});

export default WhyQuickoutScreen;
