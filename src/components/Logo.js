import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';
import styles from '../styles';

const Logo = () => {
  return (

    <View >
    <Image
        style={{width: 300, height: 300}}
        source={require('../images/Logo.png')}
      />
    </View>
  );
};

export default Logo;
