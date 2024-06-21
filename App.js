import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import MainNavigation from './src/navigation/MainNavigation.js';
import { Provider } from 'react-redux';
import store, { persistor } from './src/redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <MainNavigation />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
