import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from './src/store/config';
import {View} from 'react-native';
import {InitialScreen} from './src/modules/initial/screens';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/theme';
import {navigationRef} from './src/util/navigation/rootNavigation';
import {RaceScreen} from './src/modules/race/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
              <Stack.Screen
                options={{headerShown: false}}
                name="Initial"
                component={InitialScreen}
              />
              <Stack.Screen
                options={{headerShown: false}}
                name="Race"
                component={RaceScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}
