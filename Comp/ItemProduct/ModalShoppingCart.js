import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import ShowProduct from './ShowProduct'
import Icon from 'react-native-vector-icons/FontAwesome';
const ModalShoppingCart = ({ showModalShoppingCart, setshowModalShoppingCart }) => {
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