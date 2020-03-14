import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {Text, View, Image} from '@src/components/core';
import OptionMenu from '@components/OptionMenu';
import { switchAccount } from '@src/redux/actions/account';
import {accountSeleclor} from '@src/redux/selectors';
import {Icon} from 'react-native-elements';
import {COLORS} from '@src/styles';
import activeAccount from '@src/assets/images/icons/ic_account_active.png';
import deactiveAccount from '@src/assets/images/icons/ic_account_deactive.png';
import styles from './style';

const AccountSelect = () => {
  const [menu, setMenu] = React.useState([]);
  const { listAccount, account } = useSelector(state => ({
    listAccount: accountSeleclor.listAccount(state),
    account: accountSeleclor.defaultAccount(state),
  }), shallowEqual);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const newMenu = [];
    listAccount.forEach(item => {
      const accountName = item.name || item.AccountName;
      const isCurrentAccount = account?.name === accountName;

      newMenu.push({
        id: accountName,
        icon: <Image style={{width:35}} resizeMode="contain" source={isCurrentAccount ? activeAccount : deactiveAccount} />,
        label: (
          <Text style={{
            marginLeft: 10,
            opacity: isCurrentAccount ? 1 : 0.4,
          }}
          >{accountName}
          </Text>
        ),
        handlePress: () => handleSwitchAccount(accountName),
      });
    });

    setMenu(newMenu);
  }, [listAccount]);

  const handleSwitchAccount = (name) => {
    dispatch(switchAccount(name));
  };

  return (
    <OptionMenu
      data={menu}
      style={styles.container}
      toggleStyle={styles.toggle}
      maxHeight={500}
      itemStyle={styles.item}
      icon={(
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>{account?.name}</Text>
          <Icon name="chevron-down" color={COLORS.primary} type="material-community" />
        </View>
      )}
    />
  );
};

export default AccountSelect;
