import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';

const Register = (props) => {
  //validate email
  const [validateEmail, setValidateEmail] = useState('');
  const [validatePassword, setValidatePassword] = useState('');
  //validate password
  const [password, setPassword] = useState('');
  //validate password2
  const [password2, setPassword2] = useState('');
  const [user, setUser] = useState('');
  const [fullname, setFullname] = useState('');
  //show password
  const [show, setshow] = useState(false);
  const [visPass, setVisPass] = useState(true);
  //show password2
  const [show2, setshow2] = useState(false);
  const [visPass2, setVisPass2] = useState(true);
  //url 
  const url = 'https://64662883228bd07b355d62c5.mockapi.io/account';
  //validate email
  const checkMail = (userName) => {
    console.log(userName);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(userName) === false) {
      console.log(validateEmail + ' test');
      return false;
    }
    else {
      console.log(validateEmail + ' test1 ');
      return true;
    }
  }
  const checkPassword = (password2) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    return passwordRegex.test(password2);
  };

  // function register
  const functionRegister = () => {
    if (user.length == 0) {
      alert("Chưa nhập username");
      return;
    }
    if (fullname.length == 0) {
      alert("Chưa nhập fullname");
      return;
    }
    if (password2.length == 0) {
      alert("Chưa nhập password");
      return;
    }
    if (validateEmail == 'Lỗi') {
      alert('Mail lỗi');
      return
    }
    if (password != password2) {
      alert('2 mật khẩu không trùng khớp ');
      return
    }
    let objUser = { email: user, password: password, name: fullname, image: 'chua co', status: 1 }
    fetch(url, {
      method: 'POST',// POST: Thêm, PUT: Sửa, DELETE: xóa
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objUser),
    }).then((res) => {
      console.log(res);
      if (res.status == 201)
        alert("Đăng ký thành công");
      props.navigation.navigate('Login');
    }).catch((err) => { console.log(err); });
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://s3-alpha-sig.figma.com/img/d8f7/9177/0a9433e42748cb7f3bef6c1df9577f98?Expires=1685318400&Signature=GZpQAlL9VanPCSFQSojUWJtaT3-43VxQAdbSHJXIvczhBFjAHO3EynMswSPOgZh5Hv-M~bOoBBYPgBcnEHaZ~xQEwZUH8tIA3fkmtN1qoomkEwl~eINO8equJIWkwpg6ndemlJnkf5KQijEj-r9Q2NRYb9Fsq7R4uulifLEB4bblTi1JjoPWM76pCNRo2mnIJPVSlwhYdfIZvlEk8JposmfVlgCnrk-BR-gyBFnqgzpoo1rNcDBPypdLgsOf589Pp-ABME88Wc2eGUS4lz~Z9r-rop25IRhslaE1D1yYc3QMOh~K3i2MR5zf9rAvBbSyel30lwOUnhUYPUIMZenKnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' }}
        style={styles.img} />
      <View style={styles.viewTextinput}>
        <TextInput placeholder="Email " style={styles.textinput} onChangeText={text => {
          setUser(text);
          const isValiMail = checkMail(text);
          if (isValiMail === true) {
            setValidateEmail('');
          } else if (isValiMail === false) {
            setValidateEmail('Lỗi');
          }

        }} />
        {validateEmail == 'Lỗi' && user != '' ? <Text style={styles.validateText}>Sai định dạng email</Text> : ''}

      </View>
      <View style={styles.viewTextinput}>
        <TextInput placeholder="Full name " style={styles.textinput} onChangeText={(text) => setFullname(text)} />
      </View>
      <View style={styles.viewTextinput}>
        <View style={{ flexDirection: 'row' }}>
          <TextInput placeholder="Password " style={styles.textinput}
            onChangeText={text => {
              setPassword(text);
              const isValiPass = checkPassword(text);
              console.log(isValiPass + ' check password');
              if (isValiPass === true) {
                setValidatePassword('');
              } else if (isValiPass === false) {
                setValidatePassword('error password');
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
        {validatePassword == 'error password' && password != '' ? <Text style={styles.validateText}>Mật khẩu bao gồm cả số, chữ cái in hoa và{'\n'}không chứa ký tự đặc biệt</Text> : ''}
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
      <View style={{ marginTop: 120, alignItems: 'center' }}>
        <TouchableOpacity style={styles.btnLogin} onPress={functionRegister}>
          <Text style={styles.textLogin}>Đăng Ký</Text>
        </TouchableOpacity>
        <Text
          onPress={() => props.navigation.navigate('Login')}
          style={styles.textBacklogin}>Quay về trang đăng nhập
        </Text>
      </View>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center'
  },
  viewTextinput: {
    marginVertical: 10
  },
  textinput: {
    borderWidth: 1,
    width: 300,
    height: 45,
    padding: 7,
    borderRadius: 10,

  },
  img: {
    width: 290,
    height: 240,
  },
  validateText: {
    color: 'red',
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
  },
  textLogin: {
    color: 'white',
  }
})