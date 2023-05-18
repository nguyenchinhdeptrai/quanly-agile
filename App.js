import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Button, Text, TextInput, View, StyleSheet, TouchableHighlight } from 'react-native';
import Login from './Comp/login';
import SplashScreen from './Comp/splashScreen ';
import Changepass from './Comp/changepass';

const StackDemo = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <StackDemo.Navigator initialRouteName='SplashScreen'>
        <StackDemo.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
        <StackDemo.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <StackDemo.Screen name='Changepass' component={Changepass} options={{ headerShown: false }} />
      </StackDemo.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
