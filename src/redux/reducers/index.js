import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import {reducer as formReducer} from 'redux-form';
import {modalReducer} from '@src/components/Modal';
import notification from '@src/screens/Notification/Notification.reducer';
import stake from '@screens/Stake/stake.reducer';
import stakeHistory from '@screens/StakeHistory/stakeHistory.reducer';
import wallet from './wallet';
import account from './account';
import server from './server';
import token from './token';
import selectedPrivacy from './selectedPrivacy';
import app from './app';
import dex from './dex';
import uniswap from './uniswap';
import pin from './pin';
import globalReducer from './globalReducer';
import receivers from './receivers';

const rootReducer = reduceReducers(
  combineReducers({
    account,
    wallet,
    server,
    token,
    selectedPrivacy,
    app,
    dex,
    uniswap,
    pin,
    form: formReducer,
    modal: modalReducer,
    receivers,
    notification,
    stake,
    stakeHistory,
  }),
  globalReducer,
);

export default rootReducer;
