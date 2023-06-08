import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
const ShowProduct = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.viewImg}>
                <Image source={require('../../assets/polo.png')} style={styles.img} />
            </View>
            <View>
                <Text style={styles.textTitle}>{props.nav.name}</Text>
                <Text style={styles.textPrice}>${props.nav.price}</Text>
                <Text style={{ marginBottom: 10 }}>Choose size:</Text>
                <View style={styles.viewChooseSize}>
                    <TouchableOpacity style={styles.btnChooseSize}>
                        <Text style={{ color: 'white', fontSize: 17 }}>S</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnChooseSize}>
                        <Text style={{ color: 'white', fontSize: 17 }}>M</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnChooseSize}>
                        <Text style={{ color: 'white', fontSize: 17 }}>L</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnChooseSize}>
                        <Text style={{ color: 'white', fontSize: 17 }}>XL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnChooseSize}>
                        <Text style={{ color: 'white', fontSize: 17 }}>XXL</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewAddToCart}>
                    <TouchableOpacity style={styles.btnAddToCart}>
                        <Text>ADD TO CART</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{}}>
                        <Icon name="heart-o" size={30} color="black" />
                    </TouchableOpacity>
                </View>
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
    viewChooseSize: {
        flexDirection: 'row',

    },
    viewAddToCart: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 20,
    },
    textTitle: {
        fontSize: 20,
    },
    textPrice: {
        marginVertical: 15,
    },
    img: {
        width: 160,
        height: 200,
        margin: 10,
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