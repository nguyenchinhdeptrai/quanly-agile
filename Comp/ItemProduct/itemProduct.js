import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const ItemProduct = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/polo.png')} style={styles.img} />
            <Text style={styles.titleProduct}>Men polo shirt</Text>
            <View style={styles.viewTitleProduct}>
                <Text>$12900</Text>
                <Text>Size:M</Text>
            </View>
            <View style={styles.viewButtonProduct}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{}}>
                    <Icon name="heart-o" size={30} color="black" />
                </TouchableOpacity>
            </View>
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
        marginRight:15
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