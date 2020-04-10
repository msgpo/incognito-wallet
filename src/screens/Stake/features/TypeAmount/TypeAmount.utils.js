import {DEPOSIT_FLOW, WITHDRAW_FLOW} from '@screens/Stake/stake.constant';
import convert from '@utils/convert';
import {validator} from '@src/components/core/reduxForm';
import {noError} from '@src/components/Input/input.utils';
import {CONSTANT_COMMONS} from '@src/constants';
import format from '@src/utils/format';

export const validatedAmount = ({
  value,
  activeFlow,
  minToStake,
  maxToStake,
  minToWithdraw,
  balancePStake,
}) => {
  const pDecimals = CONSTANT_COMMONS.PRV.pDecimals;
  let min;
  let max;
  const required = validator.required()(value);
  const number = validator.number()(value);
  switch (activeFlow) {
  case DEPOSIT_FLOW: {
    min = minToStake;
    max = maxToStake;
    break;
  }
  case WITHDRAW_FLOW: {
    min = minToWithdraw;
    max = balancePStake;
    break;
  }
  default:
    break;
  }
  const minValue = validator.minValue(convert.toHumanAmount(min, pDecimals))(
    value,
  );
  const maxValue = validator.maxValue(convert.toHumanAmount(max, pDecimals))(
    value,
  );
  if (required) {
    return {
      error: true,
      message: required,
    };
  }
  if (number) {
    return {
      error: true,
      message: number,
    };
  }
  if (minValue) {
    return {
      error: true,
      message: minValue,
    };
  }
  if (maxValue) {
    return {
      error: true,
      message: maxValue,
    };
  }
  return noError;
};

export const getHookFactories = ({account, activeFlow, balancePStake}) => {
  const {pDecimals, symbol} = CONSTANT_COMMONS.PRV;
  let hookAccount = {
    id: 0,
    leftText: '',
    rightText: account?.name || account?.AccountName,
  };
  let hookBalance = {
    id: 1,
    leftText: '',
    rightText: '',
  };
  switch (activeFlow) {
  case DEPOSIT_FLOW: {
    hookBalance.leftText = 'Balance:';
    hookBalance.rightText = `${format.amountFull(
        account?.value || 0,
        pDecimals,
    )} ${symbol}`;
    hookAccount.leftText = 'Deposit from:';
    break;
  }
  case WITHDRAW_FLOW: {
    hookBalance.leftText = 'pStake balance:';
    hookBalance.rightText = `${format.amountFull(
      balancePStake || 0,
      pDecimals,
    )} ${symbol}`;
    hookAccount.leftText = 'Withdraw to:';
    break;
  }
  default:
    break;
  }
  return [hookAccount, hookBalance];
};
