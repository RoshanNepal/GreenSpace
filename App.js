import React, { Component } from 'react';
import { View, Text,StatusBar } from 'react-native';
import SignUp from './src/SignUp';
import SplashScreen from './SplashScreen';
import checkIfFirstLaunch from './src/components/checkFirstLaunch';
import Swiper from './Swiper'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading:true,
      isFirstLaunch: false,
      hasCheckedAsyncStorage: false,
    };
  }
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        10
      )
    );
  }
  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    
    const isFirstLaunch = await checkIfFirstLaunch();
    this.setState({ isFirstLaunch, hasCheckedAsyncStorage: true });

    const data = await this.performTimeConsumingTask();
  
    if (data !== null) {
      this.setState({ isLoading: false });
    }

  }
    

  render() {
    <StatusBar backgroundColor="#238B4F" barStyles="light-content" />
    const { hasCheckedAsyncStorage, isFirstLaunch } = this.state;
    if (!hasCheckedAsyncStorage) {
      return null;
    }
    if(isFirstLaunch){
      return <Swiper/>
    }

    if(this.state.isLoading){
      return <SplashScreen/>
    }
    return (
      <SignUp/>
    );
    
  }
}

export default App;