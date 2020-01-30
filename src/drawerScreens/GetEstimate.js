import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
  Dimensions,
  Picker,
} from 'react-native';

import styles from '../styles';

import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import firebase, { Firebase } from 'react-native-firebase';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import {RNToasty} from 'react-native-toasty';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import Loader from '../components/Loader';

import Modal from 'react-native-modal';

const TATA_RATE = 50;
const CYCLE_RATE = 20;
deviceWidth = ExtraDimensions.getRealWindowWidth();
deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : ExtraDimensions.getRealWindowHeight();

class Hidden extends React.Component {
  render() {
    return null;
  }
}
class GetEstimate extends Component {
  static navigationOptions = {
    drawerLabel: <Hidden />,
    drawerIcon: <Hidden />,
  };
  constructor(props) {
    super(props);
    const {params} = this.props.navigation.state;

    console.log(this.props);
    this.state = {
      loading:false,
      selectedVehicle: '',
      distanceValue: params.distanceValue,
      rate: null,
      selectedScheduleTime: ' ',
      selectedDeliveryType: ' ',
      isModalVisible: false,
      vehicleUri: '',
      setDatePickerVisibility: false,
      setTimePickerVisibility: false,
      scheduledDate: 'Set',
      DeliveryStatus:false,
    };
    this.onSelect = this.onSelect.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);

  }

  showDatePicker = () => {
    this.setState({setDatePickerVisibility: true});
  };
  handleConfirm = date => {
    
    stringDate = date.toString();
    trimDate = stringDate.split('G').shift();
      this.setState({scheduledDate: trimDate,dateValidate:date});
    
    this.setState({setDatePickerVisibility: false});

  };
  handleCancel = () => {
    this.setState({setDatePickerVisibility: false});
    this.setState({scheduledDate: 'Set'});
  };
  getCurrentDate() {
    date = new Date();
    stringDate = date.toString();
    trimDate = stringDate.split('G').shift();
    this.setState({scheduledDate: trimDate});
    setTimeout(() => {
      this.setState({
        scheduledDate: 'Set',
      });
    }, 90000);
  }

  onSelect(index, value) {
    const {distanceValue} = this.state;
    var temp = 0;
    {
      if (index === 0) {
        temp = TATA_RATE * distanceValue;
        this.setState({
          vehicleUri: require('../images/tatadelivery.png'),
        });
      } else if (index === 1) {
        temp = CYCLE_RATE * distanceValue;
        this.setState({
          vehicleUri: require('../images/scooterdelivery.png'),
        });
      }
    }

    this.setState({
      selectedVehicle: `${value}`,
      rate: temp,
    });

    if (this.state.rate === 0) {
      return;
    }
    console.log(this.state.rate);
    console.log(this.state.vehicleUri);
  }

  

  confirmTrip = () => {
    this.setState({loading:true})
    const {
      selectedVehicle,
      distanceValue,
      rate,
      selectedScheduleTime,
      selectedDeliveryType,
      scheduledDate,
      DeliveryStatus,
    } = this.state;
    const fbRootRefFS = firebase.firestore();
    const user = firebase.auth().currentUser;
    phoneNumber = user.phoneNumber.toString();
    const userID = user.uid;
    userRef = fbRootRefFS
      .collection('TripDetails')
      .doc()
      .set({
        Vehicle: selectedVehicle,
        TotalDistance: distanceValue,
        TotalCost: rate,
        ScheduleTime: selectedScheduleTime,
        selectedDeliveryType: selectedDeliveryType,
        phoneNumber: phoneNumber,
        userID: userID,
        scheduledDate: scheduledDate,
        DeliveryStatus: DeliveryStatus,
        
      }).then(this.onSuccess).catch(this.onError)
  };
  onSuccess(res) {
    setTimeout(() => {
      this.setState({
        loading: false,
      });
      this.props.navigation.navigate('MyTrips');
      RNToasty.Show({
        title: 'Trip Requested Successfully',
        duration: 1500,
      });
    }, 2000);
   
  }
  onError(err){
    this.setState({
      loading: false,
    });
    RNToasty.Show({
      title:'Please Check Your Internet',
      duration:1500,
    })
  }
 

  tripValidation = () => {
    const {selectedVehicle, selectedDeliveryType, scheduledDate,dateValidate} = this.state;
    date1 = new Date();

    if (selectedVehicle === '') {
      RNToasty.Show({
        title: 'Please Select a Vehicle',
        duration: 2000,
      });
      return;
    }
    if (selectedDeliveryType === '') {
      RNToasty.Show({
        title: 'Please Select a Delivery Type',
        duration: 2000,
      });
      return;
    }
    if (scheduledDate === 'Set') {
      RNToasty.Show({
        title: 'Please Schedule Time',
        duration: 2000,
      });
      return;
    }
    if(dateValidate < date1 ){
      RNToasty.Show({
        title: 'Please select another Date',
        duration: 2000,
      });
      return;
    }
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  renderTripInfo = () => {
    return (
      <View style={{flex: 1, marginVertical: 20}}>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Selected Vehicle : {this.state.selectedVehicle}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Total Distance : {this.state.distanceValue}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Total Cost : {this.state.rate}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#2D9F5A',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          (Prices are inclusive of VAT)
        </Text>
      </View>
    );
  };

  renderTripModal = () => {
    return (
      <View style={{flex: 1}}>
        <Modal
          isVisible={this.state.isModalVisible}
          backdropOpacity={1}
          backdropTransitionOutTiming={0}
          backdropColor="#238B4F"
          animationOut={'fadeOut'}
          animationOutTiming={300}
          hideModalContentWhileAnimating={true}
          deviceHeight={deviceHeight}
          deviceWidth={deviceWidth}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              marginVertical: 50,
            }}>
            <Image
              style={{width: 150, height: 150}}
              source={this.state.vehicleUri}
            />

            <Text
              style={{
                fontSize: 32,
                color: '#fff',
                fontWeight: 'bold',
                marginVertical: 15,
              }}>
              Trip Details
            </Text>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
              {this.state.selectedVehicle}
            </Text>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
              Total Cost : {this.state.rate}
            </Text>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
              To:
            </Text>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
              From:
            </Text>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
              Total Distance:{this.state.distanceValue}
            </Text>
            <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
              Scheduled Date:{this.state.scheduledDate.toString()}
            </Text>

            <View style={{flex: 1, marginVertical: 20}}>
              <TouchableOpacity
                style={styles.buttonConfirmTrip}
                onPress={() => this.confirmTrip()}>
                <Text style={styles.confirmtripText}>Confirm Trip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCancelTrip}
                onPress={() => this.setState({isModalVisible: false})}>
                <Text style={styles.confirmtripText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Loader loading={this.state.loading} />
      </View>
    );
  };

  renderPicker = () => {
    return (
      <View style={{flex: 1}}>
        <Picker
          selectedValue={this.state.selectedDeliveryType}
          style={{height: 80, width: '100%'}}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({selectedDeliveryType: itemValue});
          }}>
          <Picker.Item label="Select Delivery Type" value="" />
          <Picker.Item label="Furniture" value="Furniture" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Hardware" value="Hardware" />
        </Picker>
        <Picker
          selectedValue={this.state.scheduledDate}
          style={{height: 80, width: '100%'}}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({scheduledDate: itemValue});
            if (itemValue === 'later') {
              this.showDatePicker();
            }
            if (itemValue === 'now') {
              this.getCurrentDate();
            }
          }}>
          <Picker.Item label={this.state.scheduledDate} value="" />
          <Picker.Item label="Right Now" value="now" />
          <Picker.Item label="Schedule Time" value="later" />
        </Picker>
        <DateTimePickerModal
          isVisible={this.state.setDatePickerVisibility}
          mode="datetime"
          onConfirm={this.handleConfirm}
          onCancel={this.handleCancel}
        />
      </View>
    );
  };

  renderRadioGroup = () => {
    return (
      <View style={{backgroundColor: '#fff', marginVertical: 30, flex: 1}}>
        <RadioGroup
          size={20}
          thickness={2}
          color="#2D9F5A"
          style={{flexDirection: 'row', justifyContent: 'center'}}
          onSelect={(index, value) => this.onSelect(index, value)}>
          <RadioButton
            style={{alignItems: 'center', alignContent: 'center'}}
            value="Four Wheeler">
            <Image
              style={{width: 150, height: 150}}
              source={require('../images/tatadelivery.png')}
            />
          </RadioButton>

          <RadioButton style={{alignItems: 'center'}} value="Two Wheeler">
            <Image
              style={{width: 150, height: 150}}
              source={require('../images/scooterdelivery.png')}
            />
          </RadioButton>
        </RadioGroup>
        {this.renderTripInfo()}
      </View>
    );
  };
  //{this.renderHeader()}
  render() {
    return (
      <ScrollView stickyHeaderIndices={[0]} style={{flex: 1}}>
        <CustomHeaderComponent
          propsBack = 'back'
          props={this.props}
          screenHeaderTitle="Get Estimate"
        />

        {this.renderRadioGroup()}

        {this.renderPicker()}

        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <TouchableOpacity
            style={styles.buttonRequestTrip}
            onPress={this.tripValidation}>
            <Text style={styles.buttonText}>Request Trip</Text>
          </TouchableOpacity>
        </View>
        {this.renderTripModal()}
      </ScrollView>
    );
  }
}

export default GetEstimate;