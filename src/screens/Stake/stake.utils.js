import {CONSTANT_COMMONS} from '@src/constants';

export const STAKE = {
  MAIN_ACCOUNT: 'pStake',
};

export const isStakeAccount = account => {
  if (!account) {
    return false;
  }
  return (
    account?.AccountName === STAKE.MAIN_ACCOUNT ||
    account?.name === STAKE.MAIN_ACCOUNT
  );
};

export const mappingData = (dataMasterAddress, dataStakerInfo) => {
  const pDecimals = CONSTANT_COMMONS.PRV.pDecimals;
  const symbol = CONSTANT_COMMONS.PRV.symbol;
  return {
    minToStake: dataMasterAddress?.MinToStake || 0,
    minToWithdraw: dataMasterAddress?.MinToWithdraw || 0,
    currentRewardRate: dataMasterAddress?.CurrentRewardRate || 50,
    stakingMasterAddress: dataMasterAddress?.StakingMasterAddress || '',
    balance: dataStakerInfo?.Balance || 0,
    pDecimals: pDecimals,
    symbol,
    maxToStake: 0,
  };
};

export const getBalanceByRatePerSecond = (
  balance = 0,
  rate = 50,
  duration = 1,
) => {
  return balance + (balance * (rate / 100) * duration) / (365 * 24 * 60 * 60);
};
