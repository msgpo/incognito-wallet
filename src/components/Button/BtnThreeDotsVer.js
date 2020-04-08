import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/Entypo';
import {COLORS} from '@src/styles';

const styled = StyleSheet.create({});

const BtnThreeDotsVer = props => {
  return (
    <TouchableOpacity {...props}>
      <Icons
        name="dots-three-horizontal"
        size={20}
        style={{color: COLORS.white, marginRight: 20}}
      />
    </TouchableOpacity>
  );
};

BtnThreeDotsVer.propTypes = {};

export default BtnThreeDotsVer;
