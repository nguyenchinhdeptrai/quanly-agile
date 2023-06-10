import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, SafeAreaView, Button } from 'react-native'
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
                <SafeAreaView>
                    <View style={styles.view1}>
                        <Image source={require('../../assets/polo.png')} style={styles.img} />

                        <View style={styles.viewProduct}>
                            <Image source={require('../../assets/x.png')} style={styles.imgx} />
                            <Text style={styles.tittleProduct}>Men polo shirt</Text>
                            <Text>Size: M</Text>
                            <Text>$129.00</Text>

                        </View>


                    </View>


                    <View style={styles.view1}>
                        <Image source={require('../../assets/polo.png')} style={styles.img} />

                        <View style={styles.viewProduct}>
                            <Image source={require('../../assets/x.png')} style={styles.imgx} />
                            <Text style={styles.tittleProduct}>Men polo shirt</Text>
                            <Text>Size: M</Text>
                            <Text>$129.00</Text>

                        </View>


                    </View>

                    <View style={styles.view1}>
                        <Image source={require('../../assets/polo.png')} style={styles.img} />

                        <View style={styles.viewProduct}>
                            <Image source={require('../../assets/x.png')} style={styles.imgx} />
                            <Text style={styles.tittleProduct}>Men polo shirt</Text>
                            <Text>Size: M</Text>
                            <Text>$129.00</Text>

                        </View>


                    </View>

                </SafeAreaView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Checkout   387.00</Text>
                    </TouchableOpacity>
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
    }, img: {
        width: 100,
        height: 150,
        margin: 10,
    }, view1: {
        width: 350,
        height: 160,
        backgroundColor: 'blue',
        marginLeft: 30,
        borderRadius: 5,
        margin: 10
    },
    tittleProduct: {
        fontSize: 18,
    }, viewProduct: {
        marginTop: 8,
        position: 'absolute',
        top: 0,
        fontSize: 18,
        marginLeft: 120, // điều chỉnh margin theo nhu cầu
        // backgroundColor: 'rgba(0, 0, 0, 0.7)', // màu nền chữ
        color: 'white', // màu chữ
        padding: 5,
        zIndex: 1, // đảm bảo chữ hiển thị trên ảnh


    }, imgx: {
        width: 50,
        height: 30,
        marginLeft: 180,
    },
    button: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
        marginLeft: 115
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
      },
})