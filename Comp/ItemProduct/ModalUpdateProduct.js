import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
//image and system
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import DropDownPicker from 'react-native-dropdown-picker';

const ModalUpdateProduct = ({ showModalUpdate, setShowModalUpdate, name, image, price, type, id }) => {
    //img
    const [img_source, setimg_source] = useState(null)
    const [img_base64, setiimg_base64] = useState(null)

    // 
    const [nameProduct, setNameProduct] = useState(name);
    const [priceProduct, setPriceProduct] = useState(price);
    const [sizeProduct, setSizeProduct] = useState('');
    //status product
    const [open, setOpen] = useState(false); //lưu trạng thái xổ dropdown hoặc không xổ
    const [value, setValue] = useState(type); //lưu giá trị người dùng chọn phần tử nào
    const [items, setItems] = useState([ // mảng các phần tử
        { label: 'Quần', value: 'Quần' },
        { label: 'Áo', value: 'Áo' },
        { label: 'Giay', value: 'Giày' },
    ]);
    //uri product 
    const url_product = 'https://64662883228bd07b355d62c5.mockapi.io/product';
    const pickImage = async () => {
        // Đọc ảnh từ th viện thì không cần khai báo quyền
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3], // khung view cắt ảnh 
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            setimg_source(result.assets[0].uri);
            // chuyển ảnh thành base64 để upload lên json
            let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
            let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file
            FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
                .then((res) => {
                    // phải nối chuỗi với tiền tố data image
                    setiimg_base64("data:image/" + file_ext + ";base64," + res);
                    console.log(img_base64);
                    // upload ảnh lên api thì dùng PUT có thể viết ở đây
                });
        }
    }

    //function get size product
    const getSize = (size) => {
        setSizeProduct(size);
    }
    //function add product in db
    const addProduct = () => {
        if (img_source === null) {
            alert('Phải có ảnh');
            return;
        }
        if (sizeProduct === '') {
            alert('Phải có kích thước');
            return;
        }
        if (value === null) {
            alert('Phải có loại sp');
            return;
        }
        let objProduct = {
            name: nameProduct,
            price: priceProduct,
            image: img_source,
            type: value,
            size: sizeProduct,
            status: 0,
        };
        fetch(url_product, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objProduct),
        })
            .then((res) => {
                console.log(res); // In ra đối tượng Response
                if (res.status === 201) {
                    return res.json(); // Phân tích cú pháp phản hồi thành đối tượng JSON
                } else {
                    throw new Error(`Lỗi: ${res.status} - ${res.statusText}`); // Thông báo lỗi chi tiết
                }
            })
            .then((data) => {
                console.log(data); // In ra đối tượng JSON
                alert('Thêm Thành Công');
            })
            .catch((err) => {
                console.log(err);
            });

    };


    return (
        <Modal visible={showModalUpdate}
            transparent={false}
            animationType='slide'
            onRequestClose={
                () => {
                    //xay ra khi bấm nút back trên đt
                    setShowModalUpdate(false);
                }
            }>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => setShowModalUpdate(false)}>
                        <Icon name="arrow-left" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 100 }}>Sửa sản phẩm</Text>
                </View>

                <View style={{ flex: 5, alignItems: 'center' }}>
                    {img_source ? <Image source={{ uri: img_source }} style={{ width: 240, height: 140, margin: 15 }} /> :
                        <Image source={{ uri: image }} style={{ width: 240, height: 140, margin: 15 }} />}
                    {/* {img_base64 && <Image source={{ uri: img_base64 }} style={{ width: 200, height: 200 }} />} */}
                    <TouchableOpacity onPress={pickImage} style={styles.btnChooseImg}>
                        <Text style={{ fontWeight: 'bold' }}>Thêm ảnh</Text>
                    </TouchableOpacity>
                    <View>
                        <TextInput placeholder='Nhập tên sản phẩm' style={styles.textinput} value={nameProduct} onChangeText={(txt) => setNameProduct(txt)} />
                        <TextInput placeholder='Nhập giá sản phẩm' style={styles.textinput} value={priceProduct} onChangeText={(txt) => setPriceProduct(txt)} />
                        <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 15 }}>Chọn kích thước: </Text>
                        <View style={styles.viewChooseSize}>
                            <TouchableOpacity style={styles.btnChooseSize} onPress={() => {
                                getSize('S');
                                Alert.alert('Kích cỡ quần áo', 'Bạn đã chọn size S');
                            }}>
                                <Text style={{ color: 'white', fontSize: 17 }}>S</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnChooseSize} onPress={() => {
                                getSize("M");
                                Alert.alert('Kích cỡ quần áo', 'Bạn đã chọn size M');
                            }}>
                                <Text style={{ color: 'white', fontSize: 17 }}>M</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnChooseSize} onPress={() => {
                                getSize("L");
                                Alert.alert('Kích cỡ quần áo', 'Bạn đã chọn size L');
                            }}>
                                <Text style={{ color: 'white', fontSize: 17 }}>L</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnChooseSize} onPress={() => {
                                getSize("XL");
                                Alert.alert('Kích cỡ quần áo', 'Bạn đã chọn size XL');
                            }}>
                                <Text style={{ color: 'white', fontSize: 17 }}>XL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnChooseSize} onPress={() => {
                                getSize("XXL");
                                Alert.alert('Kích cỡ quần áo', 'Bạn đã chọn size XXL');
                            }}>
                                <Text style={{ color: 'white', fontSize: 17 }}>XXL</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.containerDropdown}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Chọn loại sản phẩm</Text>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                            />

                        </View>
                    </View>
                    <View style={{ margin: 20, }}>
                        <TouchableOpacity style={styles.btnAddProduct} onPress={addProduct}>
                            <Text>Thêm Sản Phẩm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => setShowModalUpdate(false)}>
                        <View style={styles.buttonClosedModal}>
                            <View style={styles.circle}>
                                <Icon name="times" size={20} color="white" />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalUpdateProduct

const styles = StyleSheet.create({
    containerDropdown: {
        width: 200,
        zIndex: 100, // thứ tự xếp chồng view
        marginLeft: 15,
        marginTop: 10,
    },
    viewStyleImg: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'black',
        borderRadius: 5,
        width: 240,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    },
    viewChooseSize: {
        flexDirection: 'row',
        marginLeft: 15,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 40,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle2: {
        width: 50,
        height: 50,
        borderRadius: 40,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textinput: {
        borderWidth: 1,
        width: 300,
        height: 45,
        padding: 7,
        borderRadius: 10,
        margin: 10,
    },


    buttonClosedModal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnChooseImg: {
        width: 120,
        height: 45,
        backgroundColor: 'pink',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
    },
    btnChooseSize: {
        width: 45,
        height: 45,
        backgroundColor: 'black',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    btnAddProduct: {
        width: 180,
        height: 45,
        backgroundColor: 'pink',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',

    },
})