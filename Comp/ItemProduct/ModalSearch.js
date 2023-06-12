import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModalSearch = ({ showModalSearch, setShowModalSearch }) => {
    const url_product = 'https://64662883228bd07b355d62c5.mockapi.io/product';
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const searchProduct = () => {

        // Gửi yêu cầu tìm kiếm sản phẩm đến API hoặc cơ sở dữ liệu
        fetch(`${url_product}?name=${search}`)
            .then(res => {
                if (res.status === 200) {
                    return res.json(); // Phân tích cú pháp phản hồi thành đối tượng JSON
                } else {
                    throw new Error(`Lỗi: ${res.status} - ${res.statusText}`); // Thông báo lỗi chi tiết
                }
            })
            .then(data => {
                console.log(data); // In ra đối tượng JSON chứa kết quả tìm kiếm
                setSearchResults(data); // Cập nhật kết quả tìm kiếm vào state
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (search !== '') {
            searchProduct();
        } else {
            setSearchResults([]); // Nếu không có giá trị tìm kiếm, danh sách kết quả sẽ là rỗng
        }
    }, [search]);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.viewItem}>
                <Image source={{ uri: item.image }} style={styles.img} />
                <Text style={styles.title}>{item.name}</Text>
                <Text>{item.price}</Text>

            </View>
        );
    }
    return (
        <Modal
            visible={showModalSearch}
            transparent={false}
            animationType='slide'
            onRequestClose={() => {
                setShowModal(false);
            }}
        >
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <TouchableOpacity onPress={() => setShowModalSearch(false)}>
                            <Icon name="arrow-left" size={20} color="black" />
                        </TouchableOpacity>
                        <TextInput
                            placeholder='Tìm kiếm'
                            style={styles.textInput}
                            value={search}
                            onChangeText={(text) => setSearch(text)}
                        />
                    </View>
                    {search.length == 0 ? <Text style={{color:'red',margin:12,}}>Không có kết quả tìm kiếm</Text> : <FlatList
                        data={searchResults}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />}


                </View>

               
            </View>
        </Modal>
    )
}

export default ModalSearch

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 5,
        alignItems: 'center'
    },
    closeButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 40,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: 350,
        height: 45,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        marginLeft: 12,
        padding: 5,
    },
    //item
    viewItem: {
        width: 200,
        height: 200,
        backgroundColor: 'gray',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    }, img: {
        width: 120,
        height: 100,
        borderRadius: 12,
    },title:{
        fontSize:20,
        fontWeight:'bold',
    }
});
