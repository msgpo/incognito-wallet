import React from 'react';
import {StyleSheet} from 'react-native';
import {BtnThreeDotsVer} from '@src/components/Button';
import {useDispatch} from 'react-redux';
import {actionToggleModal} from '@src/components/Modal';
import BottomMenu from '@src/components/Modal/features/BottomMenu';
import {useNavigation} from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
import {actionChangeFLowStep} from '@screens/Stake/stake.actions';
import {WITHDRAW_FLOW, STEP_FLOW} from '@screens/Stake/stake.constant';
import StakeModal from '@screens/Stake/stake.modal';
import {ActivitiesIcon, WithdrawIcon} from '@src/components/Icons';

// const styled = StyleSheet.create({});

const RightMenu = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onHandlePressItem = async fn => {
    await new Promise.all([dispatch(actionToggleModal()), fn()]);
  };
  const onActivities = () => navigation.navigate(routeNames.StakeHistory);
  const onWithdraw = async () => {
    await new Promise.all([
      dispatch(
        actionChangeFLowStep({
          activeFlow: WITHDRAW_FLOW,
          step: STEP_FLOW.CHOOSE_ACCOUNT,
        }),
      ),
      dispatch(
        actionToggleModal({
          visible: true,
          data: <StakeModal />,
        }),
      ),
    ]);
  };
  const rightMenuFactories = [
    {
      id: 0,
      title: 'Activities',
      desc: 'See your transaction history here',
      onPressItem: () => onHandlePressItem(onActivities),
      icon: <ActivitiesIcon />,
    },
    {
      id: 1,
      title: 'Withdraw',
      desc: 'Withdraw an amount of PRV from your pStake account',
      onPressItem: () => onHandlePressItem(onWithdraw),
      icon: <WithdrawIcon />,
    },
  ];
  const handlePress = async () => {
    await dispatch(
      actionToggleModal({
        visible: true,
        data: (
          <BottomMenu
            data={rightMenuFactories}
            onCloseMenu={async () => await dispatch(actionToggleModal())}
          />
        ),
      }),
    );
  };
  return <BtnThreeDotsVer onPress={handlePress} />;
};

RightMenu.propTypes = {};

export default RightMenu;
