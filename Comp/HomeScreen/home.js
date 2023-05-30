import { StyleSheet, Text, View, TextInput, Image, Dimensions, TouchableOpacity, ScrollView, BackHandler ,Alert } from 'react-native'
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemProduct from '../ItemProduct/itemProduct';
import Notification from './notification';
import Profile from './profile';
//
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Home = (props) => {
  const [loginInfo, setloginInfo] = useState('');
  const [screenWidth, setScreenWidth] = useState(null);
  // list data 
  const [data, setData] = useState([]);
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
  // load data and get widh screen window
  React.useEffect(() => {
    const getScreenWidth = () => {
      const { width } = Dimensions.get('window');
      setScreenWidth(width);
    };

    getScreenWidth();

    const unsubscribe = props.navigation.addListener('focus', () => {
      getData();
    });

    return () => {
      unsubscribe();
    };
  }, [props.navigation]);

  React.useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Đóng ứng dụng',
        'Bạn có chắc chắn muốn đóng ứng dụng?',
        [
          {
            text: 'Hủy',
            onPress: () => null,
          },
          { text: 'Đồng ý', onPress: () => BackHandler.exitApp() },
        ],

      );

      return true; // Trả về true nếu bạn đã xử lý sự kiện, ngược lại trả về false
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  //style screen home
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
      marginVertical: 12
    },

    viewNewProduct: {
      width: screenWidth,
      paddingHorizontal: 7,
      marginBottom: 20,
    },

    viewNewTitleProduct: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    textInput: {
      width: 300,
      height: 45,
      padding: 7,
      borderRadius: 5,
    },
    textTitleNewProduct: {
      fontSize: 20
    },
    textTitleNewProduct2: {
      textDecorationLine: 'underline',
    },
    styleImage: {
      width: 380,
      height: 180,
    },
    iconShopping: {
      marginLeft: 7,
    },
    iconSearch: {
      paddingTop: 7,
      marginHorizontal: 5,
    }
  });



  //function home
  const FunctionHome = () => {
    return (
      <View style={styles.container}>

        <View style={styles.viewHeader}>
          <View style={styles.viewSearch}>
            <Icon name="search" size={25} color="#000" style={styles.iconSearch} />
            <TextInput placeholder='Tìm kiếm' style={styles.textInput} />
          </View>
          <TouchableOpacity>
            <Icon name="shopping-cart" size={35} color="#000" style={styles.iconShopping} />
          </TouchableOpacity>
        </View>
        <View style={styles.view2}>
          <Image source={require('../../assets/z4382220027948_595c4d1067d947765fa3f80f3948ef30.jpg')} style={styles.styleImage} />
        </View>
        <ScrollView>

          <View style={styles.viewNewProduct}>
            <View style={styles.viewNewTitleProduct}>
              <Text style={styles.textTitleNewProduct}>Sản Phẩm Mới</Text>
              <Text style={styles.textTitleNewProduct2} onPress={() => console.log('click view all')}>View all</Text>
            </View>
            <ScrollView horizontal={true}>

              <ItemProduct />
              <ItemProduct />
              <ItemProduct />
              <ItemProduct />
            </ScrollView>

          </View>
          <View style={styles.viewNewProduct}>
            <View style={styles.viewNewTitleProduct}>
              <Text style={styles.textTitleNewProduct}>Sản Phẩm Đang Sale</Text>
              <Text style={styles.textTitleNewProduct2} onPress={() => console.log('click view all')}>View all</Text>
            </View>
            <ScrollView horizontal={true}>

              <ItemProduct />
              <ItemProduct />
              <ItemProduct />
              <ItemProduct />
            </ScrollView>

          </View>
        </ScrollView>
      </View>
    );
  };
  //tab navigation
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen name="HomeScreen" component={FunctionHome} options={{ headerShown: false }} />
        <Tab.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />

      </Tab.Navigator>
    </View>
  )
}

export default Home;

