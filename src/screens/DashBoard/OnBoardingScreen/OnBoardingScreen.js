import React, {useCallback, useState, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {primaryColor, primaryColorLowOpacity} from '../../../colors';
import {Button} from 'react-native-elements';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {ON_STATUS_BAR_CHANGE} from '../../../actions/types';
import {appStyles} from '../../../utils/styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import WhyQuickoutScreen from './WhyQuickoutScreen';
import SignupScreen from './SignupScreen';
import EmailVerificationScreen from './EmailVerificationScreen';
import HowScreen from './HowScreen';
import QuickoutEmailSetupScreen from './QuickoutEmailSetupScreen';
import UsingEmailScreen from './UsingEmailScreen';
import SimpleDashboardScreen from './SimpleDashboardScreen';

const slides = [
  {
    key: 'one',
    title: '',
    screen: 'WhyQuickoutScren',
  },
  {
    key: 'two',
    title: '',
    screen: 'SignupScreen',
  },
  {
    key: 'three',
    title: '',
    screen: 'EmailVerificationScreen',
  },

  {
    key: 'four',
    title: '',
    screen: 'HowScreen',
  },

  {
    key: 'five',
    title: '',
    screen: 'QuickoutEmailSetupScreen',
  },

  {
    key: 'six',
    title: '',
    screen: 'UsingEmailScreen',
  },

  {
    key: 'seven',
    title: '',
    screen: 'SimpleDashboardScreen',
  },
];

function OnBoardingScreen(props) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const appSliderRef = useRef(null);

  const _renderItem = ({item, index}) => {
    if (item.screen === 'WhyQuickoutScren') {
      return <WhyQuickoutScreen pagination={pagination} />;
    } else if (item.screen === 'SignupScreen') {
      return <SignupScreen pagination={pagination} />;
    } else if (item.screen === 'EmailVerificationScreen') {
      return <EmailVerificationScreen pagination={pagination} />;
    } else if (item.screen === 'HowScreen') {
      return <HowScreen pagination={pagination} />;
    } else if (item.screen === 'QuickoutEmailSetupScreen') {
      return <QuickoutEmailSetupScreen pagination={pagination} />;
    } else if (item.screen === 'UsingEmailScreen') {
      return <UsingEmailScreen pagination={pagination} />;
    } else if (item.screen === 'SimpleDashboardScreen') {
      return <SimpleDashboardScreen pagination={pagination} />;
    } else {
      return (
        <View style={styles.slide}>
          <Text style={styles.title}>{item.title}</Text>
          {/* <Image source={item.image} /> */}
          <Text style={styles.text}>{item.sceen}</Text>
        </View>
      );
    }
  };

  const pagination = useCallback(() => {
    const indicators = slides.map((data, index) => {
      return (
        <View
          key={index + 'onboarding'}
          style={
            index === activeSlideIndex ? styles.activeDotStyle : styles.dotStyle
          }
        />
      );
    });
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.dotContainer}>{indicators}</View>
        <Button
          title="Next"
          raised
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.titleStyle}
          onPress={() => {
            if (activeSlideIndex < 6) {
              const newIndex = activeSlideIndex + 1;
              setActiveSlideIndex(newIndex);
              console.log(activeSlideIndex, newIndex, 'actveactiveSlideIndex');
              appSliderRef.current.goToSlide(activeSlideIndex + 1);
            }
          }}
        />
      </View>
    );
  }, [activeSlideIndex]);

  return (
    <View style={styles.container}>
      <AppIntroSlider
        activeDotStyle={styles.activeDotStyle}
        dotStyle={styles.dotStyle}
        renderItem={_renderItem}
        data={slides}
        keyExtractor={(item) => item.key}
        renderPagination={() => null}
        onSlideChange={(a, b, c) => {
          setActiveSlideIndex(a);
          // console.log(a, b, c);
        }}
        ref={appSliderRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  activeDotStyle: {
    backgroundColor: primaryColor,
    height: 12,
    width: 30,
    borderRadius: 12,
    marginBottom: 40,
    marginHorizontal: 4,
  },
  dotStyle: {
    borderColor: '#999',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    height: 12,
    width: 12,
    borderRadius: 12,
    marginBottom: 40,
    marginHorizontal: 4,
  },
  slide: {
    flex: 1,
  },
  buttonStyle: {
    backgroundColor: primaryColor,
    ...appStyles.shadows,
    borderRadius: 100,
    paddingVertical: 15,
  },

  buttonContainerStyle: {
    backgroundColor: 'red',
    width: 150,
    alignSelf: 'flex-end',
  },
  titleStyle: {
    fontSize: RFPercentage(2.2),
  },
  paginationContainer: {
    backgroundColor: primaryColorLowOpacity,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
});

export default OnBoardingScreen;
