import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import styles from '../styles';
import {Card} from 'react-native-elements';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import firebase from 'react-native-firebase';

class MyHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      responseTrue: [],
    };
  }
  static navigationOptions = {
    drawerLabel: 'My History',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../images/myTrip.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  async getTripData() {
    const user = firebase.auth().currentUser;
    const userID = user.uid;
    const snapshot = await firebase
      .firestore()
      .collection('TripDetails')
      .where('userID', '==', userID)
      .get();

    this.setState({
      response: snapshot.docs.map(doc => doc.data()),
    });

    this.state.response.map(items => {
      if (items.DeliveryStatus == true) {
        const obj = {items};
        console.log(obj);
        this.setState({
          responseTrue: [...this.state.responseTrue, obj.items],
        });
      }
    });
  }

  componentDidMount() {
    this.getTripData();
  }

  listEmptyComponent = () => {
    return (
      <Text style={{textAlign: 'center'}}>
        You haven't made any trips yet.
      </Text>
    );
  };

  render() {
    
    
    return (
      <ScrollView stickyHeaderIndices={[0]} style={{flex: 1}}>
        <CustomHeaderComponent
          props={this.props}
          screenHeaderTitle="My History"
        />
        
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={responseTrue => responseTrue.scheduledDate}
          data={this.state.responseTrue}
          
          ListEmptyComponent={this.listEmptyComponent}
          renderItem={({item}) => {
            console.log({item});
            return (
              <Card containerStyle={styles.myHistoryCard}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex:1.5,flexDirection:"column",justifyContent:"space-between"}}>
                    <Text style={styles.totalCostText}>
                      Rs.{item.TotalCost}
                    </Text>
                    
                    <Text style={{fontSize:16,textAlign:"center",}}>{item.scheduledDate}</Text>
                  </View>
                  <View 
                    style={styles.verticalDivider}
                  />
                  <View style={{flex: 4,flexDirection:"column" , justifyContent:"space-between"}}>
                  <View>
                    <View style={{flexDirection:"row"}}>
                  <Image source={require('../images/dot.png')}  />
                    <Text>  Koteshwor</Text>
                    </View>
                    <View 
                    style={styles.locationDivider}
                  />
                    <View style={{flexDirection:"row"}}>
                    <Image source={require('../images/dot.png')}  />
                    <Text>  Gwarko</Text>
                    </View>


                  </View>
                  <View style={{flexDirection:"row",justifyContent: "space-between"}}>
                  <View >
                    <Text style={styles.deliverTypeText}>DELIVERY TYPE</Text>
                    <Text style={{textAlign:"center",color:"#161616"}}>{item.selectedDeliveryType}</Text>
                  </View>
                  <View >
                  <Text style={styles.deliverTypeText}>VEHICLE</Text>
                    <Text style={{color:"#161616"}} >{item.Vehicle}</Text>
                    
                  </View>
                  </View>
                  </View>
                </View>
              </Card>
            );
          }}
        />
      </ScrollView>
    );
  }
}

export default MyHistory;
