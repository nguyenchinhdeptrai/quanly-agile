import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import ShowProduct from './ShowProduct';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyModal = ({ showModal, setShowModal, selectedItem, status }) => {


  return (
    <Modal
      visible={showModal}
      transparent={false}
      animationType='slide'
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>

        <ShowProduct nav={selectedItem} status={status} />

        </View>

        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <View style={styles.circle}>
              <Icon name="times" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MyModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 5,
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
});
