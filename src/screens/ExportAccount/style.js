import { COLORS, DECOR } from '@src/styles';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.lightGrey6,
    paddingVertical: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  rightBlock: {
    flexBasis: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  copyText: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: COLORS.primary,
    textAlign: 'center',
    color: COLORS.white,
    borderRadius: DECOR.borderRadiusBorder,
    overflow: 'hidden'
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    marginBottom: 10,
    paddingVertical: 15,
    flexDirection: 'row',
  },
  itemData: {
    fontSize: 14,
    color: COLORS.dark1
  },
  itemLabel: {
    fontSize: 12,
    letterSpacing: 0.5,
    marginBottom: 5,
  }
});

export default style;
