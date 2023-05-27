import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = (props) => {
  const [loginInfo, setloginInfo] = useState('');
  // get data
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('loginInfo');
      if (value !== null) {
        setloginInfo(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };
  // load data
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getData();
    });

    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <Icon name="shopping-cart" size={35} color="#000" style={styles.iconShopping} />
        <View style={styles.viewSearch}>
          <Icon name="search" size={25} color="#000" style={styles.iconSearch} />
          <TextInput placeholder='Tìm kiếm' style={styles.textInput} />
        </View>
      </View>
      <View style={styles.view2}>
        <Image source={require('../../assets/z4382220027948_595c4d1067d947765fa3f80f3948ef30.jpg')} style={styles.styleImage} />
      </View>
      <View></View>
      <Text>This is home screen</Text>
      <Text>{loginInfo.email}</Text>


    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }, viewHeader: {
    marginTop: 50,
    flexDirection: 'row',
  },
  viewSearch: {
    flexDirection: 'row',
    borderWidth: 1,
  },
  view2: {
    marginVertical:12
  },
  textInput: {
    width: 300,
    height: 45,
    padding: 7,
    borderRadius: 5,
  },



  styleImage: {
    width: 380,
    height: 180,
  },
  iconShopping: {
    marginHorizontal: 5,
  },
  iconSearch: {
    paddingTop: 7,
    marginHorizontal: 5,
  }
})