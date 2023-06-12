import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Profile = (props) => {
    const navigation = useNavigation();
    const [loginInfo, setloginInfo] = useState('')
    //lấy thông tin tài khoản đăng nhập
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('loginInfo')
            if (value !== null) {
                setloginInfo(JSON.parse(value));
            }
        } catch (e) {
            // error reading value
            console.log(e);
        }
    }
    // đăng xuât
    const Logout = async () => {
        try {
            await AsyncStorage.removeItem('loginInfo');
            setloginInfo('');
            console.log('Done.');
            props.navigation.navigate('Login');
        } catch (e) {
            console.log(e);
            // remove error
        }

    }
    //
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getData();
        });

        return unsubscribe;
    }, [props.navigation]);
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            {loginInfo.status === 1 ? <View>
                <View style={styles.viewHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnGoBack}>
                        <Ionicons name="arrow-back" size={30} color={'black'} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: '90%', height: '80%' }}>
                        <View style={styles.viewContent}>
                            <View style={styles.viewProfile}>
                                <View style={{ marginHorizontal: 25 }}>
                                    {loginInfo.image === 'chua co' ? <Image source={require('../../assets/avta-removebg-preview.png')} style={styles.img} /> : <Image source={{ uri: loginInfo.image }} style={styles.img} />}
                                </View>
                                <View>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{loginInfo.name}</Text>
                                    {loginInfo.status === 0 ? <Text>Trạng thái: Admin</Text> : <Text>Trạng thái: User</Text>}
                                </View>
                            </View>

                        </View>
                        <View style={{ borderColor: 'gray', borderBottomWidth: 0.2 }}></View>
                        <View style={styles.viewFooter}>
                            <Text>Setting</Text>

                            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                <TouchableOpacity onPress={Logout}>
                                    <Image source={require('../../assets/ex.png')} style={{ width: 50, height: 50, }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, color: 'red', marginLeft: 30 }}>Exit</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View> : <View>
                <View style={styles.viewHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnGoBack}>
                        <Ionicons name="arrow-back" size={30} color={'black'} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ width: '90%', height: '80%' }}>
                        <View style={styles.viewContent}>
                            <View style={styles.viewProfile}>
                                <View style={{ marginHorizontal: 25 }}>
                                    {loginInfo.image === 'chua co' ? <Image source={require('../../assets/avta-removebg-preview.png')} style={styles.img} /> : <Image source={{ uri: loginInfo.image }} style={styles.img} />}
                                </View>
                                <View>
                                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{loginInfo.name}</Text>
                                    {loginInfo.status === 0 ? <Text>Trạng thái: Admin</Text> : <Text>Trạng thái: User</Text>}
                                </View>
                            </View>

                        </View>
                        <View style={{ borderColor: 'gray', borderBottomWidth: 0.2 }}></View>
                        <View style={styles.viewFooter}>
                            <Text>Setting</Text>

                            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                <TouchableOpacity onPress={Logout}>
                                    <Image source={require('../../assets/heart-removebg-preview.png')} style={{ width: 50, height: 50, marginVertical: 10, }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, marginLeft: 30 }}>Wishlist</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', marginVertical: 10, }}>
                                <TouchableOpacity onPress={Logout}>
                                    <Image source={require('../../assets/lo.png')} style={{ width: 50, height: 50, }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, marginLeft: 30 }}>Our store</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', marginVertical: 10,marginLeft:5 }}>
                                <TouchableOpacity onPress={Logout}>
                                    <Image source={require('../../assets/ex.png')} style={{ width: 50, height: 50, }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, color: 'red', marginLeft: 30 }}>Exit</Text>
                            </View>
                        </View>

                    </View>
                </View></View>}
        </View>

    )
}

export default Profile

const styles = StyleSheet.create({
    viewHeader: {
        marginTop: 10,
        height: 60,
        backgroundColor: 'white'
    }, viewContent: {
        height: 100,
        width: '100%',
    }, viewProfile: {
        flexDirection: 'row',
        backgroundColor: 'white'
    }, viewFooter: {
        height: 120,
        marginTop: 5,
    }, btnGoBack: {
        marginTop: 20
    }, img: {
        width: 50,
        height: 50,
        borderRadius: 40,
    }, btnLogout: {
        width: 100,
        height: 30,
        backgroundColor: 'pink',
        alignItems: 'center',
        borderRadius: 12,
        justifyContent: 'center',
    },


})