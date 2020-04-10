import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Modal, {actionToggleModal} from '@src/components/Modal';
import {BtnDefault} from '@src/components/Button';
import {useDispatch, useSelector} from 'react-redux';
import format from '@src/utils/format';
import {ArrowUpIcon} from '@src/components/Icons';
import {getDecimalSeparator} from '@src/resources/separator';
import {styled} from './stake.styled';
import withStake from './stake.enhance';
import StakeModal from './stake.modal';
import {actionChangeFLowStep} from './stake.actions';
import {DEPOSIT_FLOW, STEP_FLOW} from './stake.constant';
import {stakeDataSelector} from './stake.selector';
import {calInterestRate} from './stake.utils';

const Stake = () => {
  const dispatch = useDispatch();
  const {
    balance,
    symbol,
    pDecimals,
    staked,
    currentRewardRate,
    rewardDate,
  } = useSelector(stakeDataSelector);
  const initialState = {
    balanceCurrent: 0,
    duration: 1,
  };
  const [state, setState] = React.useState(initialState);
  const {balanceCurrent} = state;
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
  const handleReCalBalance = async () => {
    const interestRate = calInterestRate(
      balance,
      currentRewardRate,
      rewardDate,
    );
    await setState({
      ...state,
      balanceCurrent: balance + interestRate,
    });
  };
  React.useEffect(() => {
    if (balance !== 0) {
      const intervalId = setInterval(handleReCalBalance, 100);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);
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
              {(balanceCurrent / 1e9)
                .toFixed(6)
                .replace('.', getDecimalSeparator())}
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
      <Modal shouldCloseModalWhenTapOverlay={false} />
    </SafeAreaView>
  );
};

Stake.propTypes = {};

export default withStake(Stake);
