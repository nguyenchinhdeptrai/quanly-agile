import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';

const Changepass = (props) => {
  //validate email
  const [validateEmail, setValidateEmail] = useState('');
  //validate password
  const [password, setPassword] = useState('');
  //validate password2
  const [password2, setPassword2] = useState('');
  const [user, setUser] = useState('');
  //show password
  const [show, setshow] = useState(false);
  const [visPass, setVisPass] = useState(true);
  //show password2
  const [show2, setshow2] = useState(false);
  const [visPass2, setVisPass2] = useState(true);
  //function validate email
  const checkMail = (userName) => {
    console.log(userName);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(userName) === '') {
      // console.log(validateEmail)
      return true;
    } else if (reg.test(userName) === false) {
      console.log(validateEmail)
      setValidateEmail('')
      return false;
    }
    else {
      console.log(validateEmail)
      setValidateEmail('')
      return true;
    }
  }
  return (
    <View style={styles.container}>

      <View style={styles.view1}>
        <Image source={require('../assets/Logo.jpg')}
          style={styles.img} />
        <View style={styles.viewTextinput}>
          <TextInput placeholder="Email " style={styles.textinput} onChangeText={text => {
            setUser(text);
            const isValiMail = checkMail(text);
            // isValiMail ? setValidateEmail('') : setValidateEmail('Lỗi Email')
            if (isValiMail === true) {
              setValidateEmail('');
              // console.log(validateEmail)
            } else if (isValiMail === false) {
              setValidateEmail('Lỗi');
              console.log(validateEmail)
            }

          }} />
          {validateEmail == 'Lỗi' && user != '' ? <Text style={styles.validateText}>Sai định dạng email</Text> : ''}

        </View>
        <View style={styles.viewTextinput}>
          <View style={{ flexDirection: 'row' }}>
            <TextInput placeholder="Password " style={styles.textinput}
              onChangeText={text => {
                setPassword(text);
                if (password.length > 6) {
                  console.log('Lỗi Pass');
                }
              }}
              value={password}
              secureTextEntry={visPass}
            />
            <TouchableOpacity onPress={() => {
              setVisPass(!visPass)
              setshow(!show)
            }}>
              <Feather name={show === false ? "eye-off" : "eye"} size={24} color="black" style={{ marginLeft: -32, marginTop: 8 }} />
            </TouchableOpacity>
          </View>
          {password.length != '' && password.length < 6 ? <Text style={styles.validateText}>Ít nhất 6 ký tự</Text> : ''}
        </View>
        <View style={styles.viewTextinput}>
          <View style={{ flexDirection: 'row' }}>
            <TextInput placeholder="Nhập lại password " style={styles.textinput}
              onChangeText={text => {
                setPassword2(text);
                if (password2.length > 6) {
                  console.log('Lỗi Pass');
                }
              }}
              value={password2}
              secureTextEntry={visPass2}
            />
            <TouchableOpacity onPress={() => {
              setVisPass2(!visPass2)
              setshow2(!show2)
            }}>
              <Feather name={show2 === false ? "eye-off" : "eye"} size={24} color="black" style={{ marginLeft: -32, marginTop: 8 }} />
            </TouchableOpacity>
          </View>
          {password2.length != '' && password2.length < 6 ? <Text style={styles.validateText}>Ít nhất 6 ký tự</Text> : ''}
          {password != password2 ? <Text style={styles.validateText}>2 mật khẩu không trùng khóp</Text> : ''}
        </View>

      </View>
      <View style={styles.view2}>
        <TouchableOpacity style={styles.btnLogin}>
          <Text style={styles.textLogin}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <Text
          onPress={() => props.navigation.navigate('Login')}
          style={styles.textBacklogin}>Quay về trang đăng nhập
        </Text>
      </View>

    </View>
  )
}

export default Changepass

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center'
  },
  view1: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  view2: {
    marginTop: 120,
    flexDirection: 'column',
    alignItems: 'center'
  },

  viewTextinput: {
    marginVertical: 15
  },
  textinput: {
    borderWidth: 1,
    width: 300,
    height: 45,
    padding: 7,
    borderRadius: 10,
  },
  validateText: {
    color: 'red',
  },
  img: {
    width: 290,
    height: 240,
  },
  btnLogin: {
    marginTop: 12,
    width: 140,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200EE'
  },
  textBacklogin: {
    marginTop: 12,
    color: 'gray',
  }, textLogin: {
    color: 'white',
  }
})