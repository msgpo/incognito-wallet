import React from 'react';
import {View, Text} from 'react-native';
import {BaseTextInput as TextInput} from '@components/core';
import PropTypes from 'prop-types';
import {commonStyled as styled} from './input.styled';

const Input = React.forwardRef((props, ref) => {
  const {
    label,
    labelStyle,
    errorStyle,
    validated,
    containerStyled,
    showBorderBottom,
    ...rest
  } = props;
  const [state, setState] = React.useState({
    isFocused: false,
  });
  const {isFocused} = state;
  const onFocus = () => {
    setState({...state, isFocused: true});
    if (typeof rest.onFocus === 'function') {
      rest.onFocus();
    }
  };

  const onBlur = () => {
    setState({...state, isFocused: false});
    if (typeof rest.onBlur === 'function') {
      rest.onBlur();
    }
  };
  return (
    <View style={[styled.container, containerStyled]}>
      {!!label && (
        <Text
          style={[
            styled.label,
            isFocused ? styled.labelFocused : null,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        {...rest}
        ref={ref}
        style={[
          styled.input,
          isFocused ? styled.inputFocused : null,
          rest.style ? rest.style : null,
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {validated && validated.error && (
        <Text style={[styled.error, errorStyle]}>{validated.message}</Text>
      )}
    </View>
  );
});

Input.defaultProps = {
  label: '',
  validated: {
    error: false,
    message: '',
  },
  containerStyled: {},
  showBorderBottom: true,
  labelStyle: {},
  errorStyle: {},
};

Input.propTypes = {
  label: PropTypes.string,
  validated: PropTypes.shape({
    error: PropTypes.bool,
    message: PropTypes.string,
  }),
  containerStyled: PropTypes.any,
  labelStyle: PropTypes.any,
  showBorderBottom: PropTypes.bool,
  errorStyle: PropTypes.any,
};

export default Input;
