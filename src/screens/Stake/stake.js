import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Modal, {actionToggleModal} from '@src/components/Modal';
import {BtnDefault} from '@src/components/Button';
import {useDispatch, useSelector} from 'react-redux';
import format from '@src/utils/format';
import {ArrowUpIcon} from '@src/components/Icons';
import {useIsFocused} from 'react-navigation-hooks';
import {styled} from './stake.styled';
import withStake from './stake.enhance';
import StakeModal from './stake.modal';
import {actionChangeFLowStep} from './stake.actions';
import {DEPOSIT_FLOW, STEP_FLOW} from './stake.constant';
import {stakeDataSelector} from './stake.selector';
import {getBalanceByRatePerSecond} from './stake.utils';

const Stake = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {balance, symbol, pDecimals, staked, currentRewardRate} = useSelector(
    stakeDataSelector,
  );
  const initialState = {
    balanceCurrent: balance,
    duration: 1,
  };
  const [state, setState] = React.useState(initialState);
  const {balanceCurrent, duration} = state;
  const handleStartStake = async () => {
    await new Promise.all([
      dispatch(
        actionToggleModal({
          data: <StakeModal />,
          visible: true,
        }),
      ),
      dispatch(
        actionChangeFLowStep({
          activeFlow: DEPOSIT_FLOW,
          step: STEP_FLOW.CHOOSE_ACCOUNT,
        }),
      ),
    ]);
  };
  const handleCalBalance = async () => {
    const balanceCurrentPerSecond = getBalanceByRatePerSecond(
      balanceCurrent,
      currentRewardRate,
      duration,
    );
    await setState({
      ...state,
      balanceCurrent: balanceCurrentPerSecond,
      duration: duration + 1,
    });
  };
  React.useEffect(() => {
    if (balance !== 0 && isFocused) {
      const intervalId = setInterval(handleCalBalance, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [duration, balance, balanceCurrent]);
  React.useEffect(() => {
    if (isFocused) {
      setState({
        ...initialState,
        balanceCurrent: balance,
      });
    }
  }, [isFocused, balance]);
  return (
    <SafeAreaView style={styled.container}>
      <View style={styled.wrapper}>
        <View style={styled.hook}>
          <Text style={styled.title}>Your pStake account</Text>
          <View style={styled.balanceContainer}>
            <Text
              style={styled.balance}
              numberOfLine={1}
              ellipsizeMode="middle"
            >
              {format.amount(balanceCurrent, pDecimals)}
            </Text>
            <Text style={styled.symbol}>{symbol}</Text>
            <View style={styled.arrow}>
              <ArrowUpIcon />
            </View>
          </View>
        </View>
        <BtnDefault
          title={staked ? 'Deposit more' : 'Deposit now'}
          btnStyle={styled.btnStake}
          onPress={handleStartStake}
        />
        <Text style={styled.desc}>
          To earn annual interest rate of
          <Text style={[styled.desc, {color: '#FF8D01'}]}>
            {` ${currentRewardRate}%`}
          </Text>
        </Text>
      </View>
      <Modal />
    </SafeAreaView>
  );
};

Stake.propTypes = {};

export default withStake(Stake);
