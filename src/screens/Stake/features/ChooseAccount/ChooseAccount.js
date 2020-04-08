import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import {COLORS, FONT} from '@src/styles';
import {accountSeleclor, selectedPrivacySeleclor} from '@src/redux/selectors';
import {useSelector, useDispatch} from 'react-redux';
import {AccountIcon} from '@src/components/Icons';
import format from '@src/utils/format';
import {CONSTANT_COMMONS} from '@src/constants';
import PropTypes from 'prop-types';
import {
  actionChangeFlowAccount,
  actionFetch,
} from '@screens/Stake/stake.actions';

import {ExHandler} from '@src/services/exception';

const styled = StyleSheet.create({
  accountContainer: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  hook: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  account: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: COLORS.lightGrey1,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  accountName: {
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: COLORS.black,
    marginLeft: 20,
  },
  accountBalance: {
    fontFamily: FONT.NAME.medium,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: COLORS.lightGrey1,
  },
  lastChild: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomColor: 'transparent',
  },
});

const Account = props => {
  const {account, lastChild} = props;
  const dispatch = useDispatch();
  const {pDecimals, symbol} = useSelector(
    selectedPrivacySeleclor.getPrivacyDataByTokenID,
  )(CONSTANT_COMMONS.PRV_TOKEN_ID);
  const onChooseAccount = async () => {
    await dispatch(
      actionChangeFlowAccount({
        account,
      }),
    );
  };
  return (
    <TouchableWithoutFeedback onPress={onChooseAccount}>
      <View style={[styled.account, lastChild ? styled.lastChild : null]}>
        <View style={styled.hook}>
          <AccountIcon />
          <Text style={styled.accountName}>
            {account?.name || account?.AccountName}
          </Text>
        </View>
        <Text style={styled.accountBalance}>
          {`${format.amountFull(account?.value || 0, pDecimals)} ${symbol}`}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ChooseAccount = () => {
  const accountList = useSelector(accountSeleclor.listAccount);
  const refreshing = useSelector(accountSeleclor.isGettingBalance);
  const dispatch = useDispatch();
  const handleOnRefresh = async () => {
    try {
      await dispatch(actionFetch());
    } catch (error) {
      new ExHandler(error).showErrorToast();
    }
  };
  return (
    <View style={styled.accountContainer}>
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={refreshing.length > 0}
            onRefresh={handleOnRefresh}
          />
        )}
      >
        {accountList.map((account, index) => (
          <Account
            account={account}
            key={account?.name || account?.AccountName}
            lastChild={accountList.length - 1 === index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

Account.propTypes = {
  account: PropTypes.any.isRequired,
  lastChild: PropTypes.bool.isRequired,
};

ChooseAccount.propTypes = {};

export default ChooseAccount;
