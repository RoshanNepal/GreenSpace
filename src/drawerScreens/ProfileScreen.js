import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
  KeyboardAvoidingView,
} from 'react-native';
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
          const {fullName, email, tempfullName} = this.state;
          const fbRootRefFS = firebase.firestore();
          const user = firebase.auth().currentUser;

          const userID = user.uid;

          userRef = fbRootRefFS
            .collection('users')
            .doc(userID)
            .set({
              fullName: tempfullName,
              email,
            });

          RNToasty.Success({
            title: 'Profile Updated',
            duration: 2000,
          });
          this.setState({fullName: tempfullName});
          this.getData();
        } 

  render() {
    return (
      <ScrollView stickyHeaderIndices={[0]} style={{flex: 1}}>
        <CustomHeaderComponent props={this.props} screenHeaderTitle="Profile" />
        <View style={styles.screenscontainer}>
          <Loader loading={this.state.loading} />
          <View style={styles.profileUI}>
            <Image
              source={require('../images/user.jpg')}
              style={{height: 90, width: 90, borderRadius: 60}}
            />
            <Text style={{fontSize: 16, color: '#fff'}}>
              {this.state.fullName}
            </Text>
            <Text style={{fontSize: 16, color: '#fff'}}>
              {this.state.phoneNumber}
            </Text>
          </View>
          <KeyboardAvoidingView style={styles.editprofileform} enabled>
            <TextInput
              style={styles.forminputBox}
              keyboardType="default"
              placeholder="Full Name"
              value={this.state.tempfullName.toString()}
              editable={true}
              onChangeText={value =>
                this.setState({tempfullName: value.toString()})
              }
            />
            <TextInput
              style={styles.forminputBox}
              keyboardType="email-address"
              placeholder="Email"
              value={this.state.email}
              onChangeText={value => this.setState({email: value})}
            />
            <TextInput
              style={styles.forminputBox}
              keyboardType="email-address"
              placeholder="Email"
              value={this.state.email}
              onChangeText={value => this.setState({email: value})}
            />
            <TextInput
              style={styles.forminputBox}
              keyboardType="email-address"
              placeholder="Email"
              value={this.state.email}
              onChangeText={value => this.setState({email: value})}
            />
            <TextInput
              style={styles.forminputBox}
              keyboardType="email-address"
              placeholder="Email"
              value={this.state.email}
              onChangeText={value => this.setState({email: value})}
            />
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={this.updateProfile}
                style={styles.button}>
                <Text style={styles.buttonText}>Update Profile</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    );
  }
}

export default ProfileScreen;
