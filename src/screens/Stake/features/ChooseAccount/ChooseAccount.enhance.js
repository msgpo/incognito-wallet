import React from 'react';
import {StyleSheet, View} from 'react-native';
import ErrorBoundary from '@src/components/ErrorBoundary';
import {useDispatch, useSelector} from 'react-redux';
import {actionLoadAllBalance} from '@src/redux/actions/account';
import {activeFlowSelector} from '@screens/Stake/stake.selector';
import {DEPOSIT_FLOW} from '@screens/Stake/stake.constant';
import {COLORS} from '@src/styles';
import {Toast} from '@src/components/core';

const styled = StyleSheet.create({
  accountContainer: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: '50%',
    minHeight: '40%',
  },
});

const enhance = WrappedComp => props => {
  const dispatch = useDispatch();
  const {activeFlow} = useSelector(activeFlowSelector);
  const shouldFetchBalance = activeFlow === DEPOSIT_FLOW;
  const fetchData = async () => {
    try {
      await dispatch(actionLoadAllBalance());
    } catch (error) {
      Toast.showError(
        'This seems to be taking longer than usual. Please try again later.',
      );
    }
  };
  React.useEffect(() => {
    if (shouldFetchBalance) {
      fetchData();
    }
  }, []);
  return (
    <ErrorBoundary>
      <View style={styled.accountContainer}>
        <WrappedComp {...{...props, fetchData}} />
      </View>
    </ErrorBoundary>
  );
};

export default enhance;
