import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  select: {
    position: 'absolute',
    right: -40,
    bottom: -27, // Should be a half
    height: 54,
  },
  iconContainer: {
    width: 400,
    paddingLeft: 350,
    zIndex: 10
  },
});

export default style;
