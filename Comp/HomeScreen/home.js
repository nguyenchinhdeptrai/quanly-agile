import { StyleSheet, Text, View, TextInput, Image, Dimensions, TouchableOpacity, ScrollView, BackHandler, Alert, Modal, RefreshControl } from 'react-native'
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemProduct from '../ItemProduct/itemProduct';
import Notification from './notification';
import Profile from './profile';
import MyModal from '../ItemProduct/ModalShowProduct';
import ModalAddProduct from '../ItemProduct/ModalAddProduct';
import ModalShoppingCart from '../ItemProduct/ModalShoppingCart';
//
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Home = (props) => {
  const [loginInfo, setloginInfo] = useState('');
  const [screenWidth, setScreenWidth] = useState(null);
  // list data 
  const [data, setData] = useState([]);
  //list data
  const [ds, setds] = useState([]);
  //status
  const [isReaload, setisReaload] = useState(false)
  //get list product
  const GetListProduct = async () => {
    let uri_api = "https://64662883228bd07b355d62c5.mockapi.io/product";
    try {
      const response = await fetch(
        uri_api,
      );
      const json = await response.json();
      setds(json)
    } catch (error) {
      console.error(error);
    }
  }

  //callBack 
  const ReloadData = React.useCallback(() => {
    setisReaload(true);
    GetListProduct();
    setisReaload(false);
  });


  // get data for login when user login in the mobie app
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
      GetListProduct();
    });

    return () => {
      unsubscribe();
    };
  }, [props.navigation]);
  //closed the app when user click on button back in mobie
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
    },
    floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'lightblue',
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

  const [showModalViewAll, setshowModalViewAll] = useState(false);
  const openModalViewAll = () => {
    setshowModalViewAll(true);
  }

  //modal add propduct
  const [showModalAddProduct, setShowModalAddProduct] = useState(false);
  const openAddProduct = () => {
    setShowModalAddProduct(true);
  }
  //modal shopping cart 
  const [showModalShoppingCart, setshowModalShoppingCart] = useState(false);
  const openShoppingCart = () => {
    setshowModalShoppingCart(true);
  }
  //item list new 
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
    if (showModalViewAll === true) {
      setshowModalViewAll(false);
    }
  }


  //function 
  const splitArrayIntoChunks = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }
  //function home
  const FunctionHome = () => {
    return (
      <View style={styles.container}>

        <View style={styles.viewHeader}>
          <View style={styles.viewSearch}>
            <Icon name="search" size={25} color="#000" style={styles.iconSearch} />
            <TextInput placeholder='Tìm kiếm' style={styles.textInput} />
          </View>
          <TouchableOpacity onPress={openShoppingCart}>
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
              <Text style={styles.textTitleNewProduct2} onPress={openModalViewAll}>View all</Text>
            </View>
            <View style={{ height: 300 }}>
              <ScrollView
                horizontal={true}
                refreshControl={
                  <RefreshControl refreshing={isReaload} onRefresh={ReloadData} />
                }
              >
                {ds.slice(0, 5).map((item, index) => {
                  return (
                    <ItemProduct
                      key={index}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      size={item.size}
                      type={item.type}
                      id={item.id}
                      openModal={() => openModal(item)}
                      status={loginInfo.status}
                    />
                  );
                })}
              </ScrollView>
              {/* modal show product */}
              <MyModal
                showModal={showModal}
                setShowModal={setShowModal}
                selectedItem={selectedItem}
                status={loginInfo.status}
              />

              {/* modal show viewAll */}
              <Modal
                visible={showModalViewAll}
                transparent={false}
                animationType='slide'
                onRequestClose={() => {
                  setshowModalViewAll(false);
                }}>
                <View style={{ flex: 1 }}>
                  <View style={{ margin: 5, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => setshowModalViewAll(false)}>
                      <Icon name="arrow-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', width: screenWidth - 30 }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Danh Sách Sản Phẩm</Text>
                    </View>

                  </View>
                  <ScrollView
                    style={{ marginLeft: 5, }}
                    refreshControl={
                      <RefreshControl refreshing={isReaload} onRefresh={ReloadData} />
                    }
                  >
                    {splitArrayIntoChunks(ds, 2).map((chunk, chunkIndex) => {
                      return (
                        <View key={chunkIndex} style={{ flexDirection: 'row' }}>
                          {chunk.map((item, index) => (
                            <ItemProduct
                              key={index}
                              name={item.name}
                              price={item.price}
                              image={item.image}
                              size={item.size}
                              type={item.type}
                              id={item.id}
                              openModal={() => openModal(item)}
                            />
                          ))}
                        </View>
                      );
                    })}

                  </ScrollView>

                </View>

              </Modal>
            </View>
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

        <TouchableOpacity style={styles.floatingButton} onPress={openAddProduct}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        {/* modal add product for administration */}
        <ModalAddProduct
          showModalAddProduct={showModalAddProduct}
          setShowModalAddProduct={setShowModalAddProduct}
        />
        {/* modal add product for administration */}
        <ModalShoppingCart
          showModalShoppingCart={showModalShoppingCart}
          setshowModalShoppingCart={setshowModalShoppingCart}
        />
      </View>
    );
  };

  //tab navigation
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeScreen"
          component={FunctionHome}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="notifications" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

export default Home;

