import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SPACING, FONT } from '@src/styles';

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    flex: 3,
  },
  rowText: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey6,
    paddingBottom: 2,
    marginHorizontal: 10,
  },
  icon: {
    fontSize: 100,
    color: COLORS.primary,
    marginVertical: 40
  },
  labelText: {
    flex: 1,
    marginRight: 15,
    color: COLORS.lightGrey1,
    fontSize: 15,
    marginVertical: 2,
  },
  valueText: {
    flex: 3,
    color: COLORS.black,
    fontSize: 15,
    marginVertical: 2,
  },
  txButton: {
    flex: 3,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 3
  },
  statusValueContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    textAlign: 'left',
    flex: 1
  },
  statusRetryBtn: {
    height: 25,
    marginLeft: 20
  },
  submitBTN: {
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  cancelBTN: {
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    backgroundColor: 'gray'
  },
  warning: {
    color: 'red', 
    alignSelf: 'flex-start', 
    marginLeft: 15, 
    fontFamily: FONT.NAME.regular, 
    fontSize: 14 
  },
  depositAddressContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  copyBlock: {
    marginLeft: 5
  },
  modalBackground: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00000040'
  },
  modalContainer:{
    justifyContent: 'center', 
    alignContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#00000040', 
    width: width, 
    height: height,
    zIndex: 1,
  },
  modalContent: {
    alignItems: 'center', 
    justifyContent: 'center', 
    width: width * 0.9, 
    height: width * 0.8, 
    backgroundColor: 'white', 
    borderRadius: 12, 
    padding: 15
  },
  titleModal: {
    marginBottom: 10, 
    fontSize: 17, 
    fontFamily: FONT.NAME.medium 
  },
  txField: {
    paddingRight: 10, 
    paddingLeft: 10, 
    fontSize: 18, 
    fontFamily: FONT.NAME.regular, 
    width: width * 0.8, 
    height: 45, 
    borderColor: 'white',
    borderBottomColor: 'gray', 
    borderWidth: 0.5, 
    borderRadius: 0, 
  }
});
