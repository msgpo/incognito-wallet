import { createSelector } from 'reselect';
import SelectedPrivacy from '@src/models/selectedPrivacy';
import memoize from 'memoize-one';
import { CONSTANT_COMMONS } from '@src/constants';
import { defaultAccount } from './account';
import { followed, pTokens, internalTokens } from './token';

export const selectedPrivacySymbol = state => state?.selectedPrivacy?.symbol;

export const getPrivacyDataBySymbol = createSelector(
  defaultAccount,
  internalTokens,
  pTokens,
  followed,
  (account, _internalTokens, _pTokens, _followed) => memoize((pSymbol) => {
    let internalTokenData = _followed.find(t => t?.symbol === pSymbol);

    if (!internalTokenData) {
      // 'PRV' is not a token
      internalTokenData = _internalTokens?.find(t => t?.symbol !== CONSTANT_COMMONS.CRYPTO_SYMBOL.PRV && t?.symbol === pSymbol);
    }

    const pTokenData = _pTokens?.find(t => t?.pSymbol === pSymbol);

    return new SelectedPrivacy(account, internalTokenData, pTokenData);
  })
);

export const selectedPrivacy = createSelector(
  selectedPrivacySymbol,
  getPrivacyDataBySymbol,
  (selectedSymbol, getFn) => {
    return getFn(selectedSymbol);
  }
);

export default {
  selectedPrivacySymbol,
  selectedPrivacy
};