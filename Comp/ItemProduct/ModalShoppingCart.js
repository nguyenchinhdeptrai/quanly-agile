import { StyleSheet, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemProduct from './itemProduct';
const ModalShoppingCart = ({ showModalShoppingCart, setshowModalShoppingCart }) => {
  const [ds, setds] = useState([]);
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
  return (
    <Modal visible={showModalShoppingCart}
      transparent={false}
      animationType='slide'
      onRequestClose={
        () => {
          //xay ra khi bấm nút back trên đt
          setshowModalShoppingCart(false);
        }
      }>
      <View style={{ flex: 1 }}>
        <View>
          <Text>This is a modal add product</Text>
        </View>
        {/* list favortite */}
        <View style={{ height: 300 }}>
          <ScrollView>
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
                />
              );
            })}
          </ScrollView>
        </View>
        <TouchableOpacity onPress={() => setshowModalShoppingCart(false)}>
          <View style={styles.buttonClosedModal}>
            <View style={styles.circle}>
              <Icon name="times" size={20} color="white" />
            </View>
          </View>
        </TouchableOpacity>
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
})