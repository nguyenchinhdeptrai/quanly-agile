import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import ShowProduct from './ShowProduct';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyModal = ({ showModal, setShowModal, selectedItem, addItemToArray, myArray }) => {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    addItemToArray(newItem);
    setNewItem('');
  };

  return (
    <Modal
      visible={showModal}
      transparent={false}
      animationType='slide'
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 5 }}>
          <ShowProduct myArray={myArray} addItemToArray={addItemToArray} nav={selectedItem} />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <View style={styles.buttonClosedModal}>
              <View style={styles.circle}>
                <Icon name="times" size={20} color="white" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MyModal;

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
});
