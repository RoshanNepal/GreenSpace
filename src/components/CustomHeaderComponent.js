import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StatusBar, Image} from 'react-native';
import {Header, Left, Right, Body, Title} from 'native-base';
import styles from '../styles';
import firebase from 'react-native-firebase';

class CustomHeaderComponent extends Component {
  constructor(props) {
    super(props);
    backProp = this.props.propsBack;
    navHelper = this.props.props.navigation;
    this.state = {};
  }
  topLeftHeader = () => {
    if (backProp === 'back') {
      return (
        <View>
          <TouchableOpacity
            onPress={() => navHelper.navigate('Home')}
            style={{marginLeft: 10}}>
            <Image
              source={require('../images/left-arrow.png')}
              style={[styles.icon]}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => navHelper.openDrawer()}
          style={{marginLeft: 10}}>
          <Image source={require('../images/menu.png')} style={[styles.icon]} />
        </TouchableOpacity>
      );
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header style={{backgroundColor: '#238B4F'}}>
          <Left>{this.topLeftHeader()}</Left>
          <Body style={{alignItems: 'center', justifyContent: 'center'}}>
            <Title style={{alignItems: 'center', justifyContent: 'center'}}>
              {this.props.screenHeaderTitle}
            </Title>
          </Body>
          <Right></Right>
        </Header>
        <StatusBar backgroundColor="#238B4F" barStyles="light-content" />
      </View>
    );
  }
}

export default CustomHeaderComponent;
