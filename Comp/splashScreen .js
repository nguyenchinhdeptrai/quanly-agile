import { StyleSheet, Text, View , Image } from 'react-native'
import React from 'react'

const SplashScreen = ({ navigation }) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000)
  })
  return (
    <View style={styles.view}>
      <Image source={{ uri: 'https://s3-alpha-sig.figma.com/img/7cf3/1dd8/a0a2203c9eec6ffb1075254cbc52b8b8?Expires=1685318400&Signature=CoieTyPuCH4VQAk~8Twoy~ZSVjKKXYc0tRdwCEbqy4yM9GnS7nSgI4Gr768jTFkC6tFh2W7XHkyqZNQIjKIm15tFCETMZZ751lzFI5huNuC0rJqQns~GcbUSrag--XmnkeoUs9uvzGInxYG8Mc0Au~ZBMn~3ecl76PV1TrDqmuK7IHgyn2I5RcW-9go~ouVrA81pIE-tjrgzgQKyzKemLDd8EHy5aapsMVeuo8Q6bADASbIQWXRx~vMpKjEWLTpw9cwDn8Eue17NEj4fZO2HapvCLEzlgHor8O45YPRCmiLTNoSAQr2KakObmyxrcWePgYBjBlslOfqv-g5NJOJQeQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' }} style={styles.img} />
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
    height: '100%',
  }
})