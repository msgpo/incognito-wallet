import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {activeFlowSelector} from '@screens/Stake/stake.selector';
import {useSelector, useDispatch} from 'react-redux';
import BackButton from '@src/components/BackButton';
import {
  STEP_FLOW,
  DEPOSIT_FLOW,
  WITHDRAW_FLOW,
} from '@screens/Stake/stake.constant';
import {actionToggleModal} from '@src/components/Modal';
import {FONT, COLORS, THEME} from '@src/styles';

const styled = StyleSheet.create({
  container: {
    backgroundColor: THEME.header.backgroundColor,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 20,
  },
  title: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.medium,
    lineHeight: FONT.SIZE.medium + 6,
    color: COLORS.white,
  },
  btnBack: {
    position: 'absolute',
    left: 5,
  },
});

const Header = () => {
  const dispatch = useDispatch();
  const activedFlow = useSelector(activeFlowSelector);
  const {step, headerTitle} = activedFlow;
  const handleBack = async () => {
    await dispatch(
      actionToggleModal({
        visible: false,
        data: null,
      }),
    );
  };
  if (step === STEP_FLOW.SHOW_STATUS) {
    return null;
  }
  return (
    <View style={styled.container}>
      <View style={styled.btnBack}>
        <BackButton onPress={handleBack} />
      </View>
      <Text style={styled.title}>{headerTitle}</Text>
    </View>
  );
};

Header.propTypes = {};

export default Header;
