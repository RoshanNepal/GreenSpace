
import React from "react";
import { View ,Image,StyleSheet} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { TextInput } from "react-native-gesture-handler";
/*
The component is child component for location search 
the selected location can be stored in state variable
*/
export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={ styles.container }>
        <View style={styles.inputBox}>
        <Image source={require('./images/location.png')}  />
        <GooglePlacesAutocomplete
          placeholder="Pickup Address"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={"search"}
          listViewDisplayed="false"
          fetchDetails={true}
          renderDescription={row =>
            row.description || row.formatted_address || row.name
          }
          onPress={(data, details = null) => {
            this.props.handler(data.description)
}}
          getDefaultValue={() => {
            return ""; // text input default value
          }}
          query={{
            key: "AIzaSyACs2aALofisCzs_LuHT2fWEdbAIdkxzdg",
            language: "en", // language of the results
            types: "(cities)" // default: 'geocode'
          }}
          styles={{
            flex:1,
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth:0
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              color: '#5d5d5d',
              fontSize: 16
            },
            
          }}
          
          nearbyPlacesAPI="GoogleReverseGeocoding"
          GooglePlacesSearchQuery={{
            rankby: "distance",
            types: "food"
          }}
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3"
          ]}
          
        />
        </View>

        <View style={styles.inputBox2}>
        <Image source={require('./images/location.png')}  />
        <GooglePlacesAutocomplete
          placeholder="Drop Address"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={"search"}
          listViewDisplayed="false"
          fetchDetails={true}
          renderDescription={row =>
            row.description || row.formatted_address || row.name
          }
          onPress={(data, details = null) => {
            this.props.handler1(data.description)
}}
          getDefaultValue={() => {
            return ""; // text input default value
          }}
          query={{
            key: "AIzaSyBdLyRZAbRdigpsrt_IVIgabUGGdJO8p7Y",
            language: "en", // language of the results
            types: "(cities)" // default: 'geocode'
          }}
          styles={{
            flex:1,
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth:0
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              color: '#5d5d5d',
              fontSize: 16
            },
            
          }}
          
          nearbyPlacesAPI="GoogleReverseGeocoding"
          GooglePlacesSearchQuery={{
            rankby: "distance",
            types: "food"
          }}
          filterReverseGeocodingByTypes={[
            "locality",
            "administrative_area_level_3"
          ]}
          
        />
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
    marginRight: 20,
    marginLeft:20,
    
  
  },
  inputBox : {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#39803E',
    height: 60,
    borderTopEndRadius: 15 ,
    borderTopLeftRadius:15,
    margin: 10
  },
  inputBox2 : {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#39803E',
    height: 60,
    borderBottomLeftRadius:15 ,
    borderBottomRightRadius:15,
    margin: 10
  },
  inputIcon:{
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode : 'stretch',
    alignItems: 'center'
  }
});