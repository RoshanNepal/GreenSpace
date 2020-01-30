import React, {Component, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  BackHandler,
  Animated,
  Dimensions
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import CodeInput from 'react-native-confirmation-code-field';
import {RNToasty} from 'react-native-toasty';
import styles from './styles';
import firebase from 'react-native-firebase';
import Loader from './components/Loader';
import Logo from './components/Logo';
import Dashboard from './Dashboard';
import { ScrollView } from 'react-native-gesture-handler';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
let {width, height} = Dimensions.get('window');
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(100);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '',
      confirmResult: null,
      backClickCount: 0,
      loading: false, 
    };
  }
  /*componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  }*/

  _spring() {
    this.setState({backClickCount: 1}, () => {
      RNToasty.Show({
        title: 'Please click BACK again to exit',
        duration: 1000,
      });
      Animated.sequence([
        Animated.spring(this.springValue, {
          toValue: -0.15 * height,
          friction: 5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.springValue, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        this.setState({backClickCount: 0});
      });
    });
  }

  handleBackButton = () => {
    this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();

    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user: user.toJSON()});
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '',
          confirmResult: null,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    Keyboard.dismiss();

    const {phoneNumber} = this.state;
    if (
      phoneNumber[0] === '+' &&
      phoneNumber[1] === '9' &&
      phoneNumber[2] === '7' &&
      phoneNumber[3] === '7'
    ) {
      phoneNumber1 = phoneNumber;
    } else {
      phoneNumber1 = '+977' + phoneNumber;
    }

    if (phoneNumber1.length == 14) {
      RNToasty.Normal({
        title: 'Sending Code',
        duration: 3000,
      });

      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber1)
        .then(confirmResult => {
          this.setState({confirmResult, message: ''});
          RNToasty.Success({
            title: 'Code Sent',
            duration: 3000,
            
          });
          console.log(confirmResult);
        })

        .catch(error => {
          console.log(error)
          alert(error)
           RNToasty.Info({
           title: 'error',
          duration: 3000,
           });
        });
    } else {
      RNToasty.Show({
        title: 'Invalid Phone Number',
        duration: 3000,
      });
    }
  };

  confirmCode = codeInput => {
    Keyboard.dismiss();
    // For Android devices
          this.setState({
            loading: true,
          });
          const {confirmResult, phoneNumber} = this.state;
          if (confirmResult && codeInput.length) {
            confirmResult
              .confirm(codeInput)
              .then(user => {
                RNToasty.Success({
                  title: 'Code Confirmed',
                  duration: 2000,
                });
              })
              .catch(error => {
                RNToasty.Info({
                  title: 'Invalid Code',
                  duration: 3000,
                });

                this.setState({
                  loading: false,
                });
              });
          }
          setTimeout(() => {
            this.setState({
              loading: false,
            });
          }, 10000);
        } 
    
 

  renderPhoneNumberInput() {
    const {phoneNumber} = this.state;

    return (
      <View style={{flex:1}}>
        <View style={styles.signUpLogoView}>
          <Logo  />
        </View>
        <View style={{flex:5,justifyContent:"center",alignItems:"center"}}>

        <View style={{height:"60%",width:"70%",}}>
        <OutlinedTextField
        label='Phone number'
        keyboardType='phone-pad'
        tintColor="#2D9F5A"
        textColor="#bbb"
        baseColor="#bbb"
        formatText={this.formatText}
        onChangeText={value => this.setState({phoneNumber: value})}
        ref={this.fieldRef}
      />
      <TouchableOpacity onPress={this.signIn} style={styles.logInButton}>
            <Text style={styles.buttonText}>Log In/Register</Text>
          </TouchableOpacity>
          
        </View>
        </View>
      </View>
    );
  }

  renderMessage() {
    const {message} = this.state;

    if (!message.length) return null;

    return <Text style={styles.messagetext}>{message}</Text>;
  }
  renderVerificationCodeInput() {
    const {codeInput} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.verificationtext}>My Code is</Text>
        <Loader loading={this.state.loading} />
        <CodeInput
          onFulfill={this.confirmCode}
          codeLength={6}
          autoFocus={true}
          variant="border-b"
        />
        <View style={styles.verificationTextCont}>
          <Text style={styles.resendText}>
            Didn't Receive Verification Code?{' '}
          </Text>
          <TouchableOpacity>
            <Text style={styles.resendBtn}>Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const {user, confirmResult} = this.state;
    return (
      <View style={{flex: 1}}>
        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {!user && confirmResult && this.renderVerificationCodeInput()}

        {user && <Dashboard />}
      </View>
    );
  }
}
