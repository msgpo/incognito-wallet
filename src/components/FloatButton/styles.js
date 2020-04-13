import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT } from '@src/styles';
const { width } = Dimensions.get('window');
export default StyleSheet.create({
  floatBtn: {
    position: 'absolute',
    bottom: width <= 320 ? 5 : 10,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
  },
  btnIcon: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderColor: COLORS.white,
    borderWidth: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    ...FONT.STYLE.medium,
  },
  icon: {
    width: 70,
    height: 70,
  }
});
