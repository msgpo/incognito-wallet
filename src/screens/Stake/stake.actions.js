import {getEstimateFeeForNativeToken} from '@src/services/wallet/RpcClientService';
import convert from '@src/utils/convert';
import {getSignPublicKey, signPoolWithdraw} from '@src/services/gomobile';
import {
  actionSendNativeToken,
  getBalance as getBalanceAccount,
} from '@src/redux/actions/account';
import {CONSTANT_COMMONS} from '@src/constants';
import {accountSeleclor} from '@src/redux/selectors';
import {
  ACTION_FETCHING,
  ACTION_FETCHED,
  ACTION_FETCH_FAIL,
  ACTION_CHANGE_FLOW_STEP,
  ACTION_CHANGE_FLOW_ACCOUNT,
  ACTION_CHANGE_FLOW_AMOUNT,
  ACTION_FETCHING_FEE,
  ACTION_FETCHED_FEE,
  ACTION_FETCH_FAIL_FEE,
  ACTION_FETCHING_CREATE_STAKE,
  ACTION_FETCHED_CREATE_STAKE,
  ACTION_FETCH_FAIL_CREATE_STAKE,
  ACTION_FETCHING_CREATE_UNSTAKE,
  ACTION_FETCHED_CREATE_UNSTAKE,
  ACTION_FETCH_FAIL_CREATE_UNSTAKE,
  ACTION_BACKUP_CREATE_STAKE,
} from './stake.constant';
import {
  apiGetMasterAddress,
  apiGetStakerInfo,
  apiCreateStake,
  apiUnStake,
} from './stake.services';
import {
  stakeSelector,
  pStakeAccountSelector,
  stakeDataSelector,
  activeFlowSelector,
  createUnStakeSelector,
  createStakeSelector,
} from './stake.selector';
import {mappingData} from './stake.utils';

export const actionFetching = () => ({
  type: ACTION_FETCHING,
});

export const actionFetched = payload => ({
  type: ACTION_FETCHED,
  payload,
});

export const actionFetchFail = () => ({
  type: ACTION_FETCH_FAIL,
});

export const actionFetch = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const pStakeAccount = pStakeAccountSelector(state);
    const accounts = accountSeleclor.listAccount(state);
    const {isFetching} = stakeSelector(state);
    if (!pStakeAccount) {
      throw Error('pStake account can\'t not found!');
    }
    if (isFetching) {
      return;
    }
    await dispatch(actionFetching());
    const [dataMasterAddress, dataStakerInfo] = await new Promise.all([
      await apiGetMasterAddress(),
      await apiGetStakerInfo({paymentAddress: pStakeAccount?.PaymentAddress}),
      await accounts.map(
        async account => await dispatch(getBalanceAccount(account)),
      ),
    ]);
    const payload = mappingData(dataMasterAddress, dataStakerInfo);
    await dispatch(actionFetched(payload));
  } catch (error) {
    await dispatch(actionFetchFail());
    throw Error(error);
  }
};

export const actionChangeFLowStep = (
  payload = {activeFlow: 'deposit', step: 0},
) => ({
  type: ACTION_CHANGE_FLOW_STEP,
  payload,
});

export const actionChangeFlowAccount = (payload = {account: null}) => ({
  type: ACTION_CHANGE_FLOW_ACCOUNT,
  payload,
});

export const actionChangeFlowAmount = (payload = {amount: 0}) => ({
  type: ACTION_CHANGE_FLOW_AMOUNT,
  payload,
});

export const actionFetchingFee = () => ({
  type: ACTION_FETCHING_FEE,
});

export const actionFetchedFee = payload => ({
  type: ACTION_FETCHED_FEE,
  payload,
});

export const actionFetchFailFee = () => ({
  type: ACTION_FETCH_FAIL_FEE,
});

export const actionFetchFee = ({amount}) => async (dispatch, getState) => {
  try {
    const state = getState();
    const {from, to, walletAccount} = activeFlowSelector(state);
    const {pDecimals} = stakeDataSelector(state);
    await dispatch(actionFetchingFee());
    const amountConverted = convert.toOriginalAmount(
      convert.toNumber(amount.value),
      pDecimals,
    );
    const feeEst = await getEstimateFeeForNativeToken(
      from,
      to,
      amountConverted,
      walletAccount,
    );
    await dispatch(actionFetchedFee(feeEst));
  } catch (error) {
    await dispatch(actionFetchFailFee());
    throw Error(error);
  }
};

export const actionBackupCreateStake = () => ({
  type: ACTION_BACKUP_CREATE_STAKE,
});

export const actionFetchingCreateStake = () => ({
  type: ACTION_FETCHING_CREATE_STAKE,
});

export const actionFetchedCreateStake = payload => ({
  type: ACTION_FETCHED_CREATE_STAKE,
  payload,
});

export const actionFetchFailCreateStake = () => ({
  type: ACTION_FETCH_FAIL_CREATE_STAKE,
});

export const actionFetchCreateStake = ({amount, fee}) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const {isFetching} = createStakeSelector(state);
    if (isFetching) {
      return;
    }
    const pStakeAccount = pStakeAccountSelector(state);
    const {account} = activeFlowSelector(state);
    const {stakingMasterAddress} = stakeDataSelector(state);
    await dispatch(actionFetchingCreateStake());
    const [tx, signPublicKeyEncode] = await new Promise.all([
      await dispatch(
        actionSendNativeToken({
          account,
          amount,
          fee,
          toAddress: stakingMasterAddress,
          pDecimals: CONSTANT_COMMONS.PRV.pDecimals,
        }),
      ),
      await getSignPublicKey(pStakeAccount?.PrivateKey),
    ]);
    console.log('tx', tx);
    if (!tx?.txId) {
      throw Error('No txId');
    }
    const payload = await apiCreateStake({
      PStakeAddress: pStakeAccount?.PaymentAddress,
      SignPublicKeyEncode: signPublicKeyEncode,
      IncognitoTx: tx?.txId,
    });
    if (payload?.ID) {
      return await new Promise.all([
        await dispatch(actionFetchedCreateStake(payload)),
        await dispatch(
          actionChangeFlowAmount({amount: payload?.Amount || amount}),
        ),
        await dispatch(actionFetch()),
      ]);
    }
  } catch (error) {
    console.log('error', error);
    await dispatch(actionFetchFailCreateStake());
    throw Error(error);
  }
};

export const actionFetchingCreateUnStake = () => ({
  type: ACTION_FETCHING_CREATE_UNSTAKE,
});

export const actionFetchedCreateUnStake = payload => ({
  type: ACTION_FETCHED_CREATE_UNSTAKE,
  payload,
});

export const actionFetchFailCreateUnStake = () => ({
  type: ACTION_FETCH_FAIL_CREATE_UNSTAKE,
});

export const actionFetchCreateUnStake = ({amount}) => async (
  dispatch,
  getState,
) => {
  try {
    const state = getState();
    const {isFetching} = createUnStakeSelector(state);
    if (isFetching) {
      return;
    }
    await dispatch(actionFetchingCreateUnStake());
    const pStakeAccount = pStakeAccountSelector(state);
    const {account} = activeFlowSelector(state);
    const originalAmount = convert.toOriginalAmount(
      convert.toNumber(amount),
      CONSTANT_COMMONS.PRV.pDecimals,
    );
    const signEncode = await signPoolWithdraw(
      pStakeAccount?.PrivateKey,
      account?.PaymentAddress,
      originalAmount,
    );
    const data = {
      PStakeAddress: pStakeAccount?.PaymentAddress,
      PaymentAddress: account?.PaymentAddress,
      Amount: originalAmount,
      SignEncode: signEncode,
    };
    const payload = await apiUnStake(data);
    console.log('payload', payload);
    if (payload?.ID) {
      return await new Promise.all([
        await dispatch(actionFetchedCreateUnStake(payload)),
        await dispatch(
          actionChangeFlowAmount({amount: payload?.Amount || amount}),
        ),
        await dispatch(actionFetch()),
      ]);
    }
  } catch (error) {
    await dispatch(actionFetchFailCreateUnStake());
    throw Error(error);
  }
};
