import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet } from 'react-native';

import Login from './Comp/login';
import SplashScreen from './Comp/splashScreen ';
import Changepass from './Comp/changepass';
import Register from './Comp/register';
import Home from './Comp/HomeScreen/home';


const StackDemo = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <StackDemo.Navigator initialRouteName='SplashScreen'>
        <StackDemo.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
        <StackDemo.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <StackDemo.Screen name='Changepass' component={Changepass} options={{ headerShown: false }} />
        <StackDemo.Screen name='Register' component={Register} options={{ headerShown: false }} />
        <StackDemo.Screen name='Home' component={Home} options={{ headerShown: false }} />
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
