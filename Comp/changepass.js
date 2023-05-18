import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const changepass = (props) => {
  return (

    <View style={styles.view}>
      <Image source={{ uri: 'https://s3-alpha-sig.figma.com/img/7cf3/1dd8/a0a2203c9eec6ffb1075254cbc52b8b8?Expires=1685318400&Signature=CoieTyPuCH4VQAk~8Twoy~ZSVjKKXYc0tRdwCEbqy4yM9GnS7nSgI4Gr768jTFkC6tFh2W7XHkyqZNQIjKIm15tFCETMZZ751lzFI5huNuC0rJqQns~GcbUSrag--XmnkeoUs9uvzGInxYG8Mc0Au~ZBMn~3ecl76PV1TrDqmuK7IHgyn2I5RcW-9go~ouVrA81pIE-tjrgzgQKyzKemLDd8EHy5aapsMVeuo8Q6bADASbIQWXRx~vMpKjEWLTpw9cwDn8Eue17NEj4fZO2HapvCLEzlgHor8O45YPRCmiLTNoSAQr2KakObmyxrcWePgYBjBlslOfqv-g5NJOJQeQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' }} style={styles.img} />

      <View style={styles.viewTextinput}>
        <TextInput placeholder='Email' style={styles.textinput}></TextInput>
        <View style={{}}>
          <TextInput placeholder='New Password' style={styles.textinput}>

          </TextInput>
          
          <Text style={{ color: 'blue', marginLeft: 10, fontSize: 10 }}>Ít nhất 6 kí tự và có chưa một chữ cái in hoa </Text>

        </View>

        


        <TextInput placeholder='Confirm Password' style={styles.textinput}></TextInput>
      </View>
      <TouchableOpacity style={styles.btnLogin}>
        <Text style={styles.textLogin}>Xác Nhận</Text>
      </TouchableOpacity>

    </View>



  )
}

export default changepass

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: '',
  }, img: {
    width: '100%',
    height: '30%',
  }, view1: {
    width: 300,
    height: 50,
    backgroundColor: 'blue'

  },
  viewTextinput: {
    marginVertical: 10,
    marginTop: 10

  },
  textinput: {
    borderWidth: 1,
    width: 300,
    height: 45,
    padding: 7,
    borderRadius: 10,
    marginTop: 10
  },
  btnLogin: {
    marginTop: 12,
    width: 140,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200EE',
  },
  image1:{
    width:100,
    height:50,
    
  }
})