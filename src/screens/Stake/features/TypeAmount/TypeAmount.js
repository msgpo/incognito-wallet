import React from 'react';
import {View} from 'react-native';
import {BtnDefault} from '@src/components/Button';
import {TextInput} from '@src/components/Input';
import PropTypes from 'prop-types';
import Hook from '@screens/Stake/features/Hook';
import {styled} from './TypeAmount.styled';
import withTypeAmount from './TypeAmount.enhance';

const TypeAmount = props => {
  const {
    hookFactories,
    handleOnChangeAmount,
    amount,
    btnSubmitAmount,
    onSubmitAmount,
    shouldDisabled,
    feeData,
    loading,
  } = props;
  return (
    <View style={styled.container}>
      {hookFactories.map(item => (
        <Hook key={item.id} data={item} />
      ))}
      <TextInput
        errorStyle={styled.error}
        placeholder="0.0"
        style={styled.input}
        keyboardType="decimal-pad"
        value={amount.value}
        validated={amount.validated}
        maxLength={50}
        onChangeText={handleOnChangeAmount}
        autoFocus
      />
      <Hook data={feeData} />
      <BtnDefault
        btnStyle={styled.btnSubmit}
        title={btnSubmitAmount}
        onPress={onSubmitAmount}
        disabled={shouldDisabled}
        loading={loading}
      />
    </View>
  );
};

TypeAmount.propTypes = {
  hookFactories: PropTypes.array.isRequired,
  handleOnChangeAmount: PropTypes.func.isRequired,
  amount: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    validated: PropTypes.shape({
      error: PropTypes.bool.isRequired,
      message: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  btnSubmitAmount: PropTypes.string.isRequired,
  onSubmitAmount: PropTypes.func.isRequired,
  shouldDisabled: PropTypes.bool.isRequired,
  fee: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    isFetched: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
  feeData: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default withTypeAmount(TypeAmount);
