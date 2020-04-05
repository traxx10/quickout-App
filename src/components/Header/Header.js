import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {primaryColor} from '../../colors';

function Header(props) {
  const navigation = useNavigation();
  const {disableMenu, showBackButton} = props;

  return (
    <View style={styles.container}>
      {/* {!disableMenu && (
        <TouchableOpacity
          style={styles.menuContainer}
          onPress={() => navigation.openDrawer()}>
          <Feather color="#fff" name="menu" size={27} />
        </TouchableOpacity>
      )} */}
      {showBackButton && (
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation.goBack()}>
          <Feather color="#fff" name="arrow-left" size={27} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}> {props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp('7.5%'),
    backgroundColor: primaryColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  menuContainer: {
    marginRight: 15,
    position: 'absolute',
    top: '29%',
    right: 0,
  },
  backContainer: {
    marginLeft: 15,
    position: 'absolute',
    top: '29%',
    left: 0,
  },
  title: {
    color: '#fff',
    fontSize: RFPercentage(2),
    fontWeight: '600',
  },
});

export default Header;
