import {StyleSheet} from 'react-native';
import {COLORS, FONT} from '@src/styles';

export const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey5,
  },
  wrapper: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    margin: 20,
    borderRadius: 10,
  },
  specialBg: {
    backgroundColor: COLORS.dark4,
    width: '100%',
    height: 100,
    left: 0,
    top: -60,
    position: 'absolute',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bgStake: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'center',
  },
  hook: {
    alignItems: 'center',
  },
  desc: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: COLORS.black,
  },
  title: {
    textTransform: 'uppercase',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 6,
    color: COLORS.lightGrey1,
  },
  balanceContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  balance: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.superLarge,
    lineHeight: FONT.SIZE.superLarge + 6,
    color: COLORS.black,
  },
  symbol: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 6,
    color: COLORS.black,
    marginHorizontal: 5,
  },
  btnStake: {
    marginTop: 65,
  },
  arrow: {
    justifyContent: 'center',
  },
});
