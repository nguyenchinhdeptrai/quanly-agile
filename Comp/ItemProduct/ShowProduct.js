import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

const ShowProduct = (props) => {


    const url_product = 'https://64662883228bd07b355d62c5.mockapi.io/product';
    // status button health
    const [isLiked, setIsLiked] = useState(false);
    const handlePress = () => {
        setIsLiked((prevIsLiked) => !prevIsLiked);
    };
    //function add list favorite
    const addFavorite = () => {

        let objProduct = {
            name: props.nav.name,
            price: props.nav.price,
            image: props.nav.image,
            type: props.nav.type,
            size: props.nav.size,
            status: 1,
        };

        fetch(url_product + '/' + props.nav.id, { // Thay đổi 'productId' thành ID của sản phẩm cần sửa
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
                alert('Thêm vào danh sách yêu thích thành công');
            })
            .catch((err) => {
                console.log(err);
            });
    };



    return (
        <View style={styles.container}>
            <Text>status: {props.status}</Text>
            <View style={styles.viewImg}>
                <Image source={{ uri: props.nav.image }} style={styles.img} />
            </View>
            <View style={{ width: Dimensions.get('window').width - 130 }}>
                <Text style={styles.textTitle}>{props.nav.name}</Text>
                <Text style={styles.textPrice}>${props.nav.price}</Text>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                    <View>
                        <Text>Size: {props.nav.size}</Text>
                    </View>
                    <View>
                        <Text>Type: {props.nav.type}</Text>
                    </View>
                </View>
                <View style={styles.viewAddToCart}>
                    <TouchableOpacity style={styles.btnAddToCart} onPress={addFavorite}>
                        <Text>ADD TO CART</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{}} onPress={handlePress}>
                        <Icon
                            name={isLiked ? 'heart' : 'heart-o'}
                            size={30}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
                {props.status === 1 ?
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <Text>Sửa sản phẩm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>Xóa sản phẩm</Text>
                        </TouchableOpacity>
                    </View>
                    : ''}
            </View>
        </View>
    )
}

export default ShowProduct

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    viewImg: {
        marginTop: 12,
        width: '80%',
        height: 220,
        alignItems: 'center',
    },
    viewAddToCart: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 20,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textPrice: {
        marginVertical: 15,
    },
    img: {
        width: 300,
        height: 200,
        margin: 10,
        borderRadius: 12,
    },
    btnChooseSize: {
        width: 45,
        height: 45,
        backgroundColor: 'black',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    }, btnAddToCart: {
        backgroundColor: 'pink',
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
})