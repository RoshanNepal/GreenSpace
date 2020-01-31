import React, { Component } from 'react';
import { View, Text,Image,StatusBar } from 'react-native';
import styles from './src/styles'
import Logo from './src/components/Logo'
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.splashScreen}>
        <StatusBar backgroundColor="#2D9F5A" barStyles="light-content" />
          <Image
        style={{width: 500, height: 500}}
        source={require('./src/images/Logo.png')}
      />
          
      </View>
    );
  }
}

export default SplashScreen;