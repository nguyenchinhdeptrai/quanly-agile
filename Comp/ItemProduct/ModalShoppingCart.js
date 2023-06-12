import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const ModalShoppingCart = ({ showModalShoppingCart, setshowModalShoppingCart }) => {
  const url_product = 'https://64662883228bd07b355d62c5.mockapi.io/product';
  const [ds, setDs] = useState([]);

  const getListProduct = async () => {
    let uriApi = "https://64662883228bd07b355d62c5.mockapi.io/product";
    try {
      const response = await fetch(uriApi);
      const json = await response.json();
      const filteredList = json.filter(item => item.status === 1);
      setDs(filteredList);
    } catch (error) {
      console.error(error);
    }
  }
  const removeFavorite = (name, price, image, type, size, id) => {

    let objProduct = {
      name: name,
      price: price,
      image: image,
      type: type,
      size: size,
      status: 0,
    };

    fetch(url_product + '/' + id, { // Thay đổi 'productId' thành ID của sản phẩm cần sửa
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objProduct),
    })
      .then((res) => {
        console.log(res); // In ra đối tượng Response
        if (res.status === 200) {
          return res.json(); // Phân tích cú pháp phản hồi thành đối tượng JSON
        } else {
          throw new Error(`Lỗi: ${res.status} - ${res.statusText}`); // Thông báo lỗi chi tiết
        }
      })
      .then((data) => {
        console.log(data); // In ra đối tượng JSON
        alert('Xóa thành công');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getListProduct();
  }, []);


  return (
    <Modal visible={showModalShoppingCart} transparent={false} animationType='slide' onRequestClose={() => setshowModalShoppingCart(false)}>

      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 10 }}>
            <TouchableOpacity onPress={() => setshowModalShoppingCart(false)}>
              <Icon name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ marginRight: 120 }}>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Giỏ hàng của bạn</Text>
          </View>
        </View>

        <View style={{ height: 500 }}>
          <ScrollView>
            {ds.map((item) => (
              <View key={item.id} style={styles.view1}>
                <Image source={{ uri: item.image }} style={styles.img} />
                <View style={styles.viewProduct}>
                  <TouchableOpacity onPress={() => {
                    Alert.alert(
                      'Cảnh báo',
                      'Bạn có chắc là muốn xóa mặt hàng này đi không',
                      [
                        {
                          text: 'Không',
                          style: 'cancel',
                        },
                        {
                          text: 'Có',
                          onPress: () => {
                            removeFavorite(item.name, item.price, item.image, item.type, item.size, item.id);
                            Alert.alert('Item removed from favorites!');
                          },
                        },
                      ],
                      { cancelable: false }
                    );
                  }}>
                    <Image source={require('../../assets/x.png')} style={styles.imgx} />
                  </TouchableOpacity>
                  <Text style={styles.tittleProduct}>{item.name}</Text>
                  <Text>Size: {item.size}</Text>
                  <Text>${item.price}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={getListProduct}>
            <Text style={styles.buttonText}>Checkout   387.00</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ModalShoppingCart

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClosedModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 140,
    margin: 5,
    borderRadius: 10,
  },
  view1: {
    width: 350,
    height: 160,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center'
  },
  tittleProduct: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  viewProduct: {
    position: 'absolute',
    top: 0,
    marginLeft: 120,
    color: 'white',
    padding: 5,
    zIndex: 1,
  },
  imgx: {
    width: 50,
    height: 30,
    marginLeft: 180,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
});
