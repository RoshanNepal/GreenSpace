import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {RNToasty} from 'react-native-toasty';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import Loader from '../components/Loader';
import styles from '../styles';
import firebase from 'react-native-firebase';

export default class LogoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      phoneNumber: '',
      fullName: '',
    };
  }

  static navigationOptions = {
    drawerLabel: 'Logout',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../images/logout.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

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
        console.log(snapshot.data().fullName);
        console.log(snapshot.data().email);
        fullName = snapshot.data().fullName;
        //email = snapshot.data().email;
        this.setState({fullName: fullName});
        phoneNumber = user.phoneNumber.toString();
        this.setState({phoneNumber: phoneNumber});
      });
  }

  signOut = () => {
    this.setState({
      loading: true,
    });

    setTimeout(() => {
      this.setState({
        loading: false,
      });
      firebase.auth().signOut();
      RNToasty.Success({
        title: 'Logged Out',
        duration: 2000,
      });
    }, 2000);
  };

  render() {
    return (
      <ScrollView stickyHeaderIndices={[0]} style={{flex: 1}}>
        <CustomHeaderComponent props={this.props} screenHeaderTitle='LogOut'/>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            flex:1,
          }}>
          <Loader loading={this.state.loading} />
          <View style={{flex:2}}>
          <Image
            source={require('../images/Logo.png')}
            style={styles.logoutlogo}
          />
          
          </View>
          <View style={{flex:3,justifyContent:"center",alignItems:"center"}}>
          <Text style={styles.logouttext}>
            Are you sure you want to logout?
          </Text>
          <TouchableOpacity onPress={this.signOut} style={styles.button}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
