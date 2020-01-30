import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  BackHandler,
  Dimensions,
} from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import HomeScreen from './drawerScreens/HomeScreen';
import LogoutScreen from './drawerScreens/LogoutScreen';
import ProfileScreen from './drawerScreens/ProfileScreen';
import MyTrips from './drawerScreens/MyTrips'
import {RNToasty} from 'react-native-toasty';
import GetEstimate from './drawerScreens/GetEstimate';
import OfflineNotice from './drawerScreens/OfflineNotice'
import firebase from 'react-native-firebase';
let {screenWidth, screenHeight} = Dimensions.get('window');
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      phoneNumber: '',
      backClickCount: 0,
    };
  }

  /*componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  }*/ 

  
  componentDidMount() {
  
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user: user.toJSON()});
        this.getData();
      } else {
        // User has been signed out, reset the state
        this.setState({
          phoneNumber: '',
          fullName: '',
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
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
        fullName = snapshot.data().fullName;
        email = snapshot.data().email;
        this.setState({fullName: fullName});
        phoneNumber = user.phoneNumber.toString();
        this.setState({phoneNumber: phoneNumber});
      });
  }

  render() {
    const AppNavigator = createAppContainer(AppDrawerNavigator);

    return (
      <View style={{height:"100%"}}>
        <OfflineNotice/>
      <AppNavigator />
     
    </View>
    );
  }
}

const CustomDrawerComponents = props => (
  <SafeAreaView style={{flex: 1}}>
    <View
      style={{
        height: '25%',
        backgroundColor: '#2D9F5A',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <Image
        source={require('./images/user.jpg')}
        style={{
          borderRadius: 60,
          marginVertical: '4%',
          height: '60%',
          width: '40%',
        }}
      />
      <Text style={{fontSize: 16, color: '#fff'}}>{this.fullName}</Text>
      <Text style={{fontSize: 16, color: '#fff'}}>{this.phoneNumber}</Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
    <StatusBar backgroundColor="#39803E" barStyles="light-content" />
  </SafeAreaView>
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    MyTrips:MyTrips,
    Logout: LogoutScreen,
    GetEstimate: GetEstimate,
    OfflineNotice:OfflineNotice
    
    
  },
  {
    contentComponent: CustomDrawerComponents,
    contentOptions: {
      activeTintColor: '#2D9F5A',
    },
    initialRouteName: 'Home',
    drawerOpenRoute: 'DrawerOpen',
    unmountInactiveRoutes: true,
  },
);

export default Dashboard;
