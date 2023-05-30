import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const SplashScreen = ({ navigation }) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000)
  })
  return (
    <View style={styles.view}>
      <Image source={require('../assets/Logo.jpg')}
        style={styles.img} />

    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, img: {
    width: '100%',
    height: '45%',
  }
})