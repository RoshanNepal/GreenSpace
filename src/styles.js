import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  signUpLogoView: {
    flex: 3,
    borderBottomLeftRadius: 100,
    backgroundColor: '#2D9F5A',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logInButton: {
    backgroundColor: '#2D9F5A',
    borderRadius: 25,
    width: 270,
    paddingVertical: 14,
    marginVertical: 10,
  },
  container: {
    backgroundColor: '#2D9F5A',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerform: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerlogo: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  profileinputBox: {
    marginTop: 300,
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 10,
  },
  loginLogo: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  verificationtext: {
    color: '#fff',
    fontSize: 32,
    marginBottom: 50,
  },
  resendText: {
    color: '#fff',
    fontSize: 16,
  },
  resendBtn: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  forminputBox: {
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#38c771',
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 10,
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 25,

    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#238B4F',
    borderRadius: 25,
    width: 200,
    paddingVertical: 14,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    color: '#fff',
  },
  confirmtripText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    color: '#000',
  },

  buttonRequestTrip: {
    backgroundColor: '#238B4F',
    borderRadius: 25,
    width: 200,
    paddingVertical: 14,
    marginVertical: 10,
  },
  buttonConfirmTrip: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 200,
    paddingVertical: 14,
    marginVertical: 10,
  },
  buttonCancelTrip: {
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 200,
    paddingVertical: 14,
    marginVertical: 10,
  },

  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    fontSize: 16,
    color: '#000',
  },
  signupButton: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  loginButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerEstimate: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonestimate: {
    backgroundColor: '#2D9F5A',
    borderRadius: 25,
    paddingTop: 10,
    width: 300,
    marginTop: 120,
    height: 50,
  },
  messagetext: {
    color: '#fff',
    backgroundColor: '#20232A',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logoutlogo: {
    alignItems: 'center',
    height: 200,
    width: 200,
  },
  screenscontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileUI: {
    
    flex: 2,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  editprofileform: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
    alignContent: 'center',
  },
  logouttext: {
    margin: 20,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
  },
  verificationTextCont: {
    marginTop: 50,
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  img: {
    height: 40,
    width: 40,
  },
  btn: {
    flexDirection: 'row',
  },
  selectedItemView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 14,
    backgroundColor: '#263238',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedText: {
    fontSize: 17,
    color: '#fff',
  },
  splashScreen: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#2D9F5A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myTripsCard: {
    marginTop: 20,
    borderLeftWidth: 15,
    borderColor: '#2D9F5A',
    borderRadius: 15,
  },
  myHistoryCard: {
    marginTop: 20,
    borderLeftWidth: 15,
    borderColor: 'red',
    borderRadius: 15,
  },
  totalCostText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2D9F5A',
  },
  verticalDivider: {
    flex: 0.3,
    marginLeft: 15,
    marginRight: 15,
    borderStyle: 'solid',
    height: 110,
    borderColor: '#2D9F5A',
    borderLeftWidth: 1,
  },
  locationDivider: {
    marginLeft: 7,
    marginBottom: 4,
    borderStyle: 'dashed',
    height: 10,
    borderColor: '#2D9F5A',
    borderLeftWidth: 1,
  },
  deliverTypeText: {textAlign: 'center', fontWeight: 'bold', color: '#2D9F5A'},
});
export default styles;
