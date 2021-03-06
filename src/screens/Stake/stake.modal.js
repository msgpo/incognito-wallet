import React from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {isIOS} from '@src/utils/platform';
import {activeFlowSelector} from './stake.selector';
import {STEP_FLOW} from './stake.constant';
import ChooseAccount from './features/ChooseAccount';
import TypeAmount from './features/TypeAmount/TypeAmount';
import ShowStatus from './features/ShowStatus/ShowStatus';
import Header from './features/Header';

const styled = StyleSheet.create({
  container: {
    minWidth: 320,
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    padding: 20,
    justifyContent: 'center',
  },
});

const StakeModal = () => {
  const isPlatformIOS = isIOS();
  const Container = isPlatformIOS ? KeyboardAvoidingView : View;
  const {step} = useSelector(activeFlowSelector);
  const renderContent = () => {
    switch (step) {
    case STEP_FLOW.CHOOSE_ACCOUNT:
      return <ChooseAccount />;
    case STEP_FLOW.TYPE_AMOUNT:
      return <TypeAmount />;
    case STEP_FLOW.SHOW_STATUS:
      return <ShowStatus />;
    default:
      return null;
    }
  };

  return (
    <Container
      style={styled.container}
      behavior="padding"
      keyboardVerticalOffset={120}
    >
      <Header />
      {renderContent()}
    </Container>
  );
};

StakeModal.propTypes = {};

export default StakeModal;
