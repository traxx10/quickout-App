import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import {Dropdown} from 'react-native-material-dropdown';
import Slider from 'react-native-slider';
import Header from '../../components/Header/Header';
import {useDispatch} from 'react-redux';

function Symtoms(props) {
  const dispatch = useDispatch();
  return (
    <View>
      <Header title="Add Symptom" disableMenu showBackButton />
      <Text> Symtoms </Text>
    </View>
  );
}

export default Symtoms;
