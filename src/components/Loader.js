import React, {Component} from 'react';
import {View, Modal, ActivityIndicator} from 'react-native';
import styles from '../styles';

const Loader = props => {
  const {loading, ...attributes} = props;
  return (
    <Modal transparent={true} animationType={'fade'} visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} size="large" />
        </View>
      </View>
    </Modal>
  );
};
export default Loader;
