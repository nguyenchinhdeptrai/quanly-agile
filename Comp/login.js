import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native';

const Login = (props) => {
    //validate from
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    //show password
    const [show, setshow] = useState(false);
    const [visPass, setVisPass] = useState(true);
    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                <Image source={{ uri: 'https://s3-alpha-sig.figma.com/img/d8f7/9177/0a9433e42748cb7f3bef6c1df9577f98?Expires=1685318400&Signature=GZpQAlL9VanPCSFQSojUWJtaT3-43VxQAdbSHJXIvczhBFjAHO3EynMswSPOgZh5Hv-M~bOoBBYPgBcnEHaZ~xQEwZUH8tIA3fkmtN1qoomkEwl~eINO8equJIWkwpg6ndemlJnkf5KQijEj-r9Q2NRYb9Fsq7R4uulifLEB4bblTi1JjoPWM76pCNRo2mnIJPVSlwhYdfIZvlEk8JposmfVlgCnrk-BR-gyBFnqgzpoo1rNcDBPypdLgsOf589Pp-ABME88Wc2eGUS4lz~Z9r-rop25IRhslaE1D1yYc3QMOh~K3i2MR5zf9rAvBbSyel30lwOUnhUYPUIMZenKnA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' }}
                    style={styles.img} />
                <View style={styles.viewTextinput}>
                    <TextInput placeholder="Username " style={styles.textinput} onChangeText={text => {
                        setUser(text);
                        if (user.length < 3) {
                            console.log('User nhỏ hơn 3 ký tự');
                        }
                    }} />
                    {user.length != '' && user.length < 3 ? <Text style={styles.validateText}>Ít nhất 3 ký tự</Text> : ''}

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

                <TouchableOpacity style={styles.btnLogin}>
                    <Text style={styles.textLogin}>Đăng Nhập</Text>
                </TouchableOpacity>
                <View style={styles.viewRegister}>
                    <Text onPress={() => props.navigation.navigate('SplashScreen')} style={styles.textRegister}>Quên mật khẩu</Text>
                    <Text>Đăng Ký</Text>
                </View>
            </View>
            <View style={styles.view2}>
                <Text style={{ color: 'gray' }}>Or sigin with</Text>
                <View style={styles.viewFacebook}>
                    <TouchableOpacity style={styles.btnViewWith}>
                        <Icon name="facebook" type="font-awesome" size={30} color="#3b5998" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnViewWith}>
                        <Icon name="google" type="font-awesome" size={30} color="#db4a39" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnViewWith}>
                        <Icon name="twitter" type="font-awesome" size={30} color="#1da1f2" />
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center'
    },

    view1: {
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center'
    },
    view2: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    viewTextinput: {
        marginVertical: 10
    },
    viewRegister: {
        flexDirection: 'row',
        marginTop: 50,
    },
    viewFacebook: {
        flexDirection: 'row',
        padding: 10,
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
    btnViewWith: {
        margin: 7
    },
    textinput: {
        borderWidth: 1,
        width: 300,
        height: 45,
        padding: 7,
        borderRadius: 10,

    },
    textLogin: {
        fontWeight: 'bold',
        color: 'white'
    },
    textRegister: {
        marginRight: 170
    },



})