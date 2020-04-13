import { COLORS } from '@src/styles';
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const style = StyleSheet.create({
  btn: {
    paddingVertical: 8,
    alignItems: 'center',
    height: width <= 320 ? 100 : 130,
  },
  image: {
    marginBottom: 0,
    width: width <= 320 ? 30 : 45,
    height: width <= 320 ? 30 : 45,
    resizeMode: 'contain',
  },
  title: {
    fontSize: width <= 320 ? 13 : 15,
    lineHeight: 30,
    color: COLORS.black,
    textAlign: 'center',
  },
  desc: {
    fontSize: width <= 320 ? 13 : 15,
    color: COLORS.lightGrey1,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
});

export default style;
