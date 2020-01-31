import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Picker,
  KeyboardAvoidingView,
} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import {OutlinedTextField} from 'react-native-material-textfield';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import styles from '../styles';
import Loader from '../components/Loader';
import {RNToasty} from 'react-native-toasty';
import firebase from 'react-native-firebase';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      tempfullName: '',
      loading: false,
    };
  }
  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../images/profile.png')}
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
        console.log(snapshot.data());
        console.log(snapshot.data().email);
        fullName = snapshot.data().fullName;
        email = snapshot.data().email;
        address = snapshot.data().address;
        gender = snapshot.data().gender;
        this.setState({gender: gender});
        this.setState({address: address});
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

  updateProfile = () => {
    const {fullName, email, tempfullName, address, gender} = this.state;
    const fbRootRefFS = firebase.firestore();
    const user = firebase.auth().currentUser;

    const userID = user.uid;

    userRef = fbRootRefFS
      .collection('users')
      .doc(userID)
      .set({
        fullName: tempfullName,
        email,
        address,
        gender,
      });

    RNToasty.Success({
      title: 'Profile Updated',
      duration: 2000,
    });
    this.setState({fullName: tempfullName});
    this.getData();
  };

  render() {
    return (
      <ScrollView stickyHeaderIndices={[0]} style={{flex: 1}}>
        <CustomHeaderComponent props={this.props} screenHeaderTitle="Profile" />

        <Loader loading={this.state.loading} />
        <View style={styles.profileUI}>
          <Image
            source={require('../images/user.jpg')}
            style={{height: 110, width: 110, borderRadius: 60}}
          />
          <Text style={{fontSize: 24, fontWeight: 'bold', color: '#2D9F5A'}}>
            {this.state.fullName}
          </Text>
        </View>

        
          <View style = {{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",marginBottom:12,marginLeft:20}}>
            <View style = {{backgroundColor:"#2D9F5A",height:50 ,width:"13%",justifyContent:"center",alignItems:"center",borderTopRightRadius:20,borderBottomRightRadius:20,borderTopLeftRadius:20,borderBottomLeftRadius:20}}>
          <Image
            source={require('../images/phone.png')}
            style={{height: 30, width: 30}}
          />
          </View>
            <View style={{justifyContent:"center",width:"87%"}}>
              <Text style={{fontWeight:"bold",color:"#555555",paddingLeft:50}}>{this.state.phoneNumber}</Text>
            </View>
          </View>
        
          <View style = {{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",marginBottom:12,marginLeft:20}}>
            <View style = {{backgroundColor:"#2D9F5A",height:50 ,width:"13%",justifyContent:"center",alignItems:"center",borderTopRightRadius:20,borderBottomRightRadius:20,borderTopLeftRadius:20,borderBottomLeftRadius:20}}>
          <Image
            source={require('../images/mail.png')}
            style={{height: 20, width: 20}}
          />
          </View>
            <View style={{justifyContent:"center",width:"87%"}}>
              <Text style={{fontWeight:"bold",color:"#555555",paddingLeft:50}}>{this.state.email}</Text>
            </View>
          </View>
          <View style = {{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",marginBottom:12,marginLeft:20}}>
            <View style = {{backgroundColor:"#2D9F5A",height:50 ,width:"13%",justifyContent:"center",alignItems:"center",borderTopRightRadius:20,borderBottomRightRadius:20,borderTopLeftRadius:20,borderBottomLeftRadius:20}}>
          <Image
            source={require('../images/pin.png')}
            style={{height: 20, width: 20}}
          />
          </View>
            <View style={{justifyContent:"center",width:"87%"}}>
              <Text style={{fontWeight:"bold",color:"#555555",paddingLeft:50}}>{this.state.address}</Text>
            </View>
          </View>
          <View style = {{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",marginBottom:12,marginLeft:20}}>
            <View style = {{backgroundColor:"#2D9F5A",height:50 ,width:"13%",justifyContent:"center",alignItems:"center",borderTopRightRadius:20,borderBottomRightRadius:20,borderTopLeftRadius:20,borderBottomLeftRadius:20}}>
          <Image
            source={require('../images/gender.png')}
            style={{height: 20, width: 20}}
          />
          </View>
            <View style={{justifyContent:"center",width:"87%"}}>
              <Text style={{fontWeight:"bold",color:"#555555",paddingLeft:50}}>{this.state.gender}</Text>
            </View>
          </View>

      </ScrollView>
    );
  }
}

export default ProfileScreen;
