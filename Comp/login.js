import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {
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
    //login
    const functionLogin = () => {
        if (user.length == 0) {
            alert("Chưa nhập email");
            return;
        }
        if (password.length == 0) {
            alert("Chưa nhập password");
            return;
        }
        let url_check = 'https://64662883228bd07b355d62c5.mockapi.io/account?email=' + user;
        console.log(url_check);
        fetch(url_check)
            .then((res) => { return res.json(); })
            .then(async (res_login) => {
                console.log(res_login);
                if (res_login.length != 1) {
                    alert("Tài khoản hoặc mật khẩu không chính xác");
                    console.log("Lỗi data");
                    return;
                }
                else {
                    // số lượng lấy được 1 bản ghi 
                    let objU = res_login[0];
                    if (objU.password != password) {
                        alert("Tài khoản hoặc mật khẩu không chính xác");
                        return;
                    } else {
                        //đúng pass thì lưu vào asyn
                        try {
                            await AsyncStorage.setItem('loginInfo', JSON.stringify(objU))
                            //chuyển màn hình
                            props.navigation.navigate('Home')
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
            })
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
                        if (isValiMail === true) {
                            setValidateEmail('');
                        } else if (isValiMail === false) {
                            setValidateEmail('Lỗi');
                            console.log(validateEmail)
                        }

                    }} />
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
                </View>

                <TouchableOpacity style={styles.btnLogin} onPress={functionLogin}>
                    <Text style={styles.textLogin}>Đăng Nhập</Text>
                </TouchableOpacity>
                <View style={styles.viewRegister}>
                    <Text onPress={() => props.navigation.navigate('Changepass')} style={styles.textRegister}>Quên mật khẩu</Text>
                    <Text onPress={() => props.navigation.navigate('Register')} >Đăng Ký</Text>
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
        flexDirection: 'column',
        alignItems: 'center'
    },
    view2: {
        marginTop: 120,
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
        width: 200,
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