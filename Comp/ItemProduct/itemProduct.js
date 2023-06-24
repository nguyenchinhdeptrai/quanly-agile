import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';
import ModalUpdateProductSS from './ModalUpdateProduct';
const ItemProduct = ({ item, name, openModal, price, size, image, status, id, type, selected }) => {
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const openModalUpdate = () => {
        setShowModalUpdate(true);
    }

    const url_product = 'https://64662883228bd07b355d62c5.mockapi.io/product';
    const deleteProduct = () => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn xóa sản phẩm này?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Xóa',
                    onPress: () => {
                        fetch(url_product + '/' + id, {
                            method: 'DELETE',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
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
                                Alert.alert('Thành công', 'Xóa sản phẩm thành công');
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (

        <View style={styles.container}>

            <TouchableOpacity onPress={openModal}>
                <Image source={{ uri: image }} style={styles.img} />
            </TouchableOpacity>
            <Text style={styles.titleProduct}>{name}</Text>
            <View style={styles.viewTitleProduct}>
                <Text>${price}</Text>
                <Text>Size:{size}</Text>
            </View>
            {status === 1 ? <View style={styles.viewButtonProduct}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{}}>
                    <Icon name="heart-o" size={30} color="black" />
                </TouchableOpacity>
            </View> : <View style={styles.viewButtonProduct}>
                <TouchableOpacity style={{}} onPress={openModalUpdate}>
                    <Icon name="edit" size={30} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={deleteProduct}>
                    <Icon name="trash" size={30} color="red" />
                </TouchableOpacity>
            </View>}
            <ModalUpdateProductSS showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                name={name}
                image={image}
                price={price}
                size={size}
                type={type}
                id={id} />


        </View>
    )
}

export default ItemProduct;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 210,
        backgroundColor: 'gray',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginRight: 15,
        marginBottom: 10,
    },
    viewTitleProduct: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width - 275,
    },
    viewButtonProduct: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 260,
        marginTop: 10
    },
    img: {
        width: 120,
        height: 150,
        margin: 10,
        borderRadius: 12,
    },
    titleProduct: {
        fontSize: 18,
    }, button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
    }, textButton: {
        paddingHorizontal: 12,
        paddingVertical: 3,
    }
})