import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

//
import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


const ModalAddProduct = ({ showModalAddProduct, setShowModalAddProduct }) => {

  const [img_base64, setiimg_base64] = useState(null)


  const pickImage = async () => {

    // Đọc ảnh từ thư viện thì không cần khai báo quyền
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3], // khung view cắt ảnh 
      quality: 1,
    });


    console.log(result);


    if (!result.canceled) {

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

  return (
    <Modal visible={showModalAddProduct}
      transparent={false}
      animationType='slide'
      onRequestClose={
        () => {
          //xay ra khi bấm nút back trên đt
          setShowModalAddProduct(false);
        }
      }>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => setShowModalAddProduct(false)}>
            <Icon name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 100 }}>Thêm sản phẩm</Text>
        </View>
        <View style={{ flex: 5 }}>

          <Text>View 2</Text>
          <TouchableOpacity onPress={pickImage} >
            <Text>Thêm ảnh</Text>
          </TouchableOpacity>
          {img_base64 && <Image source={{ uri: img_base64 }} style={{ width: 200, height: 200 }} />}
          <Text>Hello</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => setShowModalAddProduct(false)}>
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

export default ModalAddProduct

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