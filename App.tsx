/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import AppNavigation from './src/navigations/AppNavigation';
import { Host } from 'react-native-portalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Host>
        <AppNavigation />
      </Host>
    </GestureHandlerRootView>
  );
}

export default App;