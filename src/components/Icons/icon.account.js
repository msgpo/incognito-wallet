import React from 'react';
import {Image} from 'react-native';
import srcAccountIcon from '@src/assets/images/icons/ic_account_active.png';

const AccountIcon = props => {
  const defaultStyle = {
    width: 32,
    height: 32,
  };
  const {style, source, ...rest} = props;
  return (
    <Image source={srcAccountIcon} style={[defaultStyle, style]} {...rest} />
  );
};

export default AccountIcon;
