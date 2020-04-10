import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {BtnBack} from '@src/components/Button';
import PropTypes from 'prop-types';
import {FONT, COLORS} from '@src/styles';
import RightMenu from '@src/screens/Stake/features/RightMenu';
import {useNavigation} from 'react-navigation-hooks';

const styled = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  center: {},
  title: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 6,
    color: COLORS.black,
    paddingTop: 2,
  },
  right: {
    padding: 5,
  },
});

const StakeHeader = props => {
  const navigation = useNavigation();
  return (
    <View style={styled.container}>
      <View style={styled.left}>
        <BtnBack onPress={() => navigation.pop()} />
      </View>
      <View style={styled.center}>
        <Text style={styled.title}>Stake PRV</Text>
      </View>
      <View style={styled.right}>
        <RightMenu />
      </View>
    </View>
  );
};

StakeHeader.defaultProps = {
  //   right: () => null,
  //   center: () => null,
};

StakeHeader.propTypes = {
  //   right: PropTypes.element,
  //   center: PropTypes.element,
};

export default StakeHeader;
