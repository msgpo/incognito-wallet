import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from '@src/components/core';
import icShield from '@assets/images/icons/ic_shield_btn.png';
import icSend from '@assets/images/icons/ic_send_btn.png';
import icReceive from '@assets/images/icons/ic_receive_btn.png';
import icTrade from '@assets/images/icons/ic_trade.png';
import icInvent from '@assets/images/icons/ic_invent_btn.png';
import icPower from '@assets/images/icons/ic_power.png';
import icBuy from '@assets/images/icons/ic_buy_prv.png';
import icPapp from '@assets/images/icons/ic_papp.png';
import icUniswap from '@assets/images/icons/ic_uniswap.png';
import IconTextButton from '@screens/Home/IconTextButton';
import ROUTE_NAMES from '@routers/routeNames';
import {withRoundHeaderLayout} from '@src/hoc';
import Feedback from '@src/components/Feedback';
import Card from '@components/Card';
import {BIG_COINS} from '@screens/Dex/constants';
import {useSelector} from 'react-redux';
import accountSeleclor from '@src/redux/selectors/account';
import dexUtil from '@utils/dex';
import LinkingService from '@src/services/linking';
import {CONSTANT_EVENTS} from '@src/constants';
import LocalDatabase from '@utils/LocalDatabase';
import {withdraw} from '@services/api/withdraw';
import {logEvent} from '@services/firebase';
import icStake from '@assets/images/icons/stake_icon.png';
import RightMenu from '@screens/Stake/features/RightMenu';
import styles from './style';

const sendItem = {
  image: icSend,
  title: 'Send',
  desc: 'anonymously',
  route: ROUTE_NAMES.SendCrypto,
};
const receiveItem = {
  image: icReceive,
  title: 'Receive',
  desc: 'anonymously',
  route: ROUTE_NAMES.ReceiveCoin,
};
const shieldItem = {
  image: icShield,
  title: 'Shield',
  desc: 'your crypto',
  route: ROUTE_NAMES.Shield,
};

const pappItem = {
  image: icPapp,
  title: 'pApp',
  route: ROUTE_NAMES.pApps,
};

const powerItem = {
  image: icPower,
  title: 'Power',
  route: ROUTE_NAMES.Community,
  onPress: () => {
    LinkingService.openUrl(
      'https://node.incognito.org/payment.html?utm_source=app&utm_medium=homepage%20app&utm_campaign=pnode',
    );
  },
};

const pUniswapItem = {
  image: icUniswap,
  title: 'pUniswap',
  route: ROUTE_NAMES.pUniswap,
  event: CONSTANT_EVENTS.CLICK_HOME_UNISWAP
};

const buttons = [
  {
    image: icBuy,
    title: 'Buy PRV',
    route: ROUTE_NAMES.Dex,
    params: {
      inputTokenId: BIG_COINS.USDT,
      outputTokenId: BIG_COINS.PRV,
    },
    event: CONSTANT_EVENTS.CLICK_HOME_BUY,
  },
  shieldItem,
  sendItem,
  receiveItem,
  {
    image: icInvent,
    title: 'Issue',
    route: ROUTE_NAMES.CreateToken,
  },
  {
    image: icTrade,
    title: 'Trade',
    route: ROUTE_NAMES.Dex,
    event: CONSTANT_EVENTS.CLICK_HOME_TRADE
  },
  pappItem,
  powerItem,
  pUniswapItem,
  {
    image: icStake,
    title: 'Stake',
    route: ROUTE_NAMES.Stake,
    params: {
      navigationOptions: {
        title: 'Staking PRV',
        headerRight: <RightMenu />,
        headerBackground: '#00000000'
      },
    },
  },
];

const Home = ({navigation}) => {
  const account = useSelector(accountSeleclor.defaultAccount);

  const goToScreen = (route, params, event) => {
    navigation.navigate(route, params);
    logEvent(event);
  };

  const isDisabled = item => {
    if (item === sendItem && dexUtil.isDEXMainAccount(account.name)) {
      return true;
    }

    if (
      (item === receiveItem || item === shieldItem) &&
      dexUtil.isDEXWithdrawAccount(account.name)
    ) {
      return true;
    }

    if (item === pUniswapItem && global.isMainnet) {
      return true;
    }

    return false;
  };

  const tryLastWithdrawal = async () => {
    try {
      const txs = await LocalDatabase.getWithdrawalData();

      for (const tx in txs) {
        if (tx) {
          await withdraw(tx);
          await LocalDatabase.removeWithdrawalData(tx.burningTxId);
        }
      }
    } catch (e) {
      //
    }
  };

  React.useEffect(() => {
    tryLastWithdrawal();
  }, []);

  return (
    <Card style={styles.container}>
      <View style={styles.btnContainer}>
        {buttons.map(item => (
          <View style={styles.btn} key={item.title}>
            <IconTextButton
              image={item.image}
              title={item.title}
              disabled={isDisabled(item)}
              onPress={
                item.onPress || (() => goToScreen(item.route, item.params))
              }
            />
          </View>
        ))}
        <Feedback />
      </View>
    </Card>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default withRoundHeaderLayout(Home);
