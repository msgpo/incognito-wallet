import { StyleSheet } from 'react-native';
import TextStyle, { scaleInApp,FontStyle } from '@src/styles/TextStyle';

const style = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    padding:scaleInApp(10),
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: scaleInApp(4),
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowColor: 'rgba(208,208,208,0.5)',
    shadowOpacity: 1,
    shadowRadius: 1.2
  },
  list:{
    margin:scaleInApp(10)
  },
  container_item:{
    flexDirection:'row',
    marginVertical:scaleInApp(5)
  },
  imageLogo:{
    alignSelf:'center',
    width:scaleInApp(40),
    height:scaleInApp(40),
  },
  groupLeft:{
    flexDirection:'column',
    flex:1,
    justifyContent:'space-between',
    marginLeft:scaleInApp(10)
  },
  groupLeft_title:{
    ...TextStyle.normalText,
    backgroundColor: 'transparent',
    'letterSpacing':0,
    color: 'rgba(0,0,0,1)',
  },
  groupRight:{
    flexDirection:'row',
    alignItems:'center'
  },
  groupRight_title:{
    ...TextStyle.normalText,
    ...FontStyle.medium,
    'letterSpacing':0,
    color: '#000000',
  },
  groupRight_title2:{
    ...TextStyle.normalText,
    'letterSpacing':0,
    color: '#899092',
  }
});

export default style;
