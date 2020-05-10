import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/navigation/appStack';
import {ActivityIndicator} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal';
import {ONE_SIGNAL_APPID} from './src/utils/constant';

function App(props) {
  useEffect(() => {
    SplashScreen.hide();
    initOneSignal();
  }, []);

  const initOneSignal = () => {
    //Remove this method to stop OneSignal Debugging
    OneSignal.setLogLevel(6, 0);

    OneSignal.init(ONE_SIGNAL_APPID, {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
  };

  return (
    <Provider store={store().store}>
      <PersistGate
        loading={<ActivityIndicator />}
        persistor={store().persistor}>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
