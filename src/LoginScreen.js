import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image ,TouchableOpacity , Keyboard} from 'react-native';
import styles from './styles';
import firebase from 'react-native-firebase';
import Logo from './components/Logo'
import Dashboard from './Dashboard'



export default class SignUp  extends Component{
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+977',
      confirmResult: null,
    };
  }


  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '+977',
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
     if (this.unsubscribe) this.unsubscribe();
  }

  // clean up in case there is pending update
  componentWillUnmount() {
    clearTimeout(this.hideTimeout)
  }
  signIn = () => {
    Keyboard.dismiss();

    const { phoneNumber } = this.state;
    this.setState({message : 'sending code'}
    
    )
    this.hideTimeout = setTimeout(() => this.setState({message: ''}), 3000);

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => {
        this.setState({ confirmResult, message: 'Code has been sent!' })
        this.hideTimeout = setTimeout(() => this.setState({message: ''}), 3000)
      }
      
      )
      
      .catch(error =>{ this.setState({ message: `Sign In With Phone Number Error: ${error.message}` })
      this.hideTimeout = setTimeout(() => this.setState({message: ''}), 3000)
    });
  };

  confirmCode = () => {
    const { codeInput, confirmResult,fullName,password,phoneNumber} = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
          this.hideTimeout = setTimeout(() => this.setState({message: ''}), 2000)
          
        })
        .catch(error =>{ this.setState({ message: `Code Confirm Error: ${error.message}` })
        this.hideTimeout = setTimeout(() => this.setState({message: ''}), 3000)
      });
    }
  };
 
 

  renderPhoneNumberInput() {
   const { phoneNumber } = this.state;

   const { navigate } = this.props.navigation;

    return (
      
      <View style={styles.container}>
        <Logo/>
        <TextInput style={styles.inputBox}
      keyboardType="phone-pad"
      placeholder='Phone Number'
      onChangeText = {value => this.setState({phoneNumber: value})}
      value={phoneNumber}
      ref={(input) => this.phone = input}
      onSubmitEditing = {()=> this.password.focus()}
      / >
      <TouchableOpacity onPress={this.signIn} style ={styles.button} >
      <Text style ={styles.buttonText} >Log In</Text>
    </TouchableOpacity>

    <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
        <Text style={styles.loginButton}>SignUp</Text>
        </TouchableOpacity>
      </View>

      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={styles.messagetext}>{message}</Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <TouchableOpacity style ={styles.button} onPress={this.confirmCode} >
            <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1 }}>

        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()} 

        {!user && confirmResult && this.renderVerificationCodeInput()}

        {user && (
          <Dashboard/>
        )}
        
      </View>
    );
  }
}


