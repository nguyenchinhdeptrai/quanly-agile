import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SplashScreen = ({ navigation }) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000)
  })
  return (
    <View style={styles}>
      <Text>Welcome</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
})