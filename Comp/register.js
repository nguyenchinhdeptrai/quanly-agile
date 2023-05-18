import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';
import React, {useState} from 'react'

export default function App() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <View>
        <Image 
            source={{uri: 'https://s3-alpha-sig.figma.com/img/d8f7/9177/0a9433e42748cb7f3bef6c1df9577f98?Expires=1685318400&Signature=GZpQAlL9VanPCSFQSojUWJtaT3-43VxQAdbSHJXIvczhBFjAHO3EynMswSPOgZh5Hv-M~bOoBBYPgBcnEHaZ~xQEwZUH8tIA3fkmtN1qoomkEwl~eINO8equJIWkwpg6ndemlJnkf5KQijEj-r9Q2NRYb9Fsq7R4uulifLEB4bblTi1JjoPWM76pCNRo2mnIJPVSlwhYdfIZvlEk8JposmfVlgCnrk-BR-gyBFnqgzpoo1rNcDBPypdLgsOf589Pp-ABME88Wc2eGUS4lz~Z9r-rop25IRhslaE1D1yYc3QMOh~K3i2MR5zf9rAvBbSyel30lwOUnhUYPUIMZenKnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'}}
            style={styles.img}
        />
      </View>
      <View>
        <TextInput 
            style={styles.textInput}
            placeholder='email'
            >

        </TextInput>
        <TextInput 
            style={styles.textInput}
            placeholder='user'
            onChangeText={text => {
              setUser(text);
              if (user.length < 3) {
                  console.log('Người dùng nhỏ hơn 3 ký tự');
              }
          }}/>
          {user.length != '' && user.length < 3 ? 
          <Text style={{color: 'red', marginLeft: 30}}>Ít nhất 3 ký tự</Text> : ''}
        <TextInput 
            style={styles.textInput}
            placeholder='password'
            onChangeText={text=>{
              setPassword(text);
              if (password.length <6){
                console.log('Mật khẩu nhỏ hơn 6 ký tự');
              }
            }}/>
            {password.length != '' && password.length <6 ?
            <Text style={{color: 'red', marginLeft: 30}}>Ít nhất 6 ký tự</Text> : ''}
        <TextInput 
            style={styles.textInput}
            placeholder='comfirm password'/>
      </View>
      <View style={{marginTop: 50}}>
        <Button
            title='Đăng ký'>

        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 220,
    width: 200,
  },
  textInput: {
    borderWidth: 1,
    width: 300,
    height: 45,
    padding: 7,
    borderRadius: 10,
    margin: 20,
  },
});