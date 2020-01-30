import React, {Component} from 'react';
import {View, Text, Platform,TouchableOpacity} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import CustomHeaderComponent from '../components/CustomHeaderComponent';
class Hidden extends React.Component {
  render() {
    return null;
  }
}
class OfflineNotice extends Component {
  constructor(props) {
    super(props);
    console.log('asdas')
    console.log(this.props);
    this.state = {
      connectionInfo: true,
    };
  }
  handleConnectivityChange = state => {
    if(state.isConnected){
      this.setState({connectionInfo: true});
    }
    else{
      this.setState({connectionInfo: false});
    }
    
  };
  componentDidMount = () => {
      NetInfo.addEventListener(this.handleConnectivityChange);
  }
    static navigationOptions = {
      drawerLabel: <Hidden />,
      drawerIcon: <Hidden />,
    };
  render() {
    const {connectionInfo} = this.state;
    console.log('hello')
    console.log(this.props);
    if (!connectionInfo) {
      return (
        
        <View style={{height:"100%",}}>
          
        </View>
      );
    } else {
      return null;
    }
  }
}

export default OfflineNotice;
