import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/navigation/appStack';
import {ActivityIndicator} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

function App(props) {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
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
