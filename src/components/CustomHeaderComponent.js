import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StatusBar,Image } from 'react-native';
import {Header, Left, Right, Body, Title} from 'native-base';
import styles from '../styles';
import firebase from 'react-native-firebase'

class CustomHeaderComponent extends Component {
  constructor(props) {
    super(props);
    backProp = this.props.propsBack;
    if(backProp == 'back'){
      console.log('asdsa')
    }
    console.log(backProp);
    navHelper = this.props.props.navigation;
    console.log(this.props)
    this.state = {
    };
    
  }
  componentDidMount() {
    this.getData();

  }

  getData() {
    const user = firebase.auth().currentUser;
    const userID = user.uid;

    firebase
      .firestore()
      .collection('users')
      .doc(userID)
      .get()
      .then(snapshot => {
        console.log(snapshot.data());
        console.log(snapshot.data().email);
        fullName = snapshot.data().fullName;
        email = snapshot.data().email;
        this.setState({fullName: fullName});
        this.setState({tempfullName: fullName});
        this.setState({email: email});
        phoneNumber = user.phoneNumber.toString();
        this.setState({phoneNumber: phoneNumber});
        this.setState({
          loading: false,
        });
      });
  }
  topLeftHeader = () => {

    if(backProp === 'back'){
      return(
        <View>
        <TouchableOpacity
            onPress={() => navHelper.navigate('Home')} style={{marginLeft:10}}> 
            <Image
              source={require('../images/left-arrow.png')}
              style={[styles.icon]}
            />
    
          </TouchableOpacity>

          </View>
      );
    }else{
      return(
        <TouchableOpacity
            onPress={() => navHelper.openDrawer()} style={{marginLeft:10}}> 
            <Image
              source={require('../images/menu.png')}
              style={[styles.icon]}
            />
          </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <Header style={{backgroundColor: '#238B4F'}}>
        <Left>
          {this.topLeftHeader()}
        </Left>
        <Body style={{alignItems: 'center', justifyContent: 'center'}}>
          <Title style={{alignItems: 'center', justifyContent: 'center'}}>
            {this.props.screenHeaderTitle}
          
          </Title>
        </Body>
        <Right></Right>
      </Header>
      <StatusBar backgroundColor="#238B4F" barStyles="light-content" />
    </View>)
    
  }
}

export default CustomHeaderComponent;


