import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header/Header';

function CalenderScreen(props) {
  return (
    <View>
      <Header title="Calender" />
      <Text> CalenderScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CalenderScreen;
