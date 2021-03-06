import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import SearchInput from '@src/components/Input/input.search';
import PropTypes from 'prop-types';
import {Button} from '@src/components/core';
import srcNotFound from '@src/assets/images/icons/not_found_receiver.png';
import ReceiverIcon from '@src/components/Icons/icon.receiver';
import {isIOS} from '@utils/platform';
import Swipeout from 'react-native-swipeout';
import {BtnDelete, BtnEdit} from '@src/components/Button';
import {
  styledModal as styled,
  emptyListStyled,
  listStyled,
  itemStyled,
} from './FrequentReceivers.styled';
import withModal from './FrequentReceivers.enhance';

const Item = ({
  name,
  address,
  disabledSwipe,
  _onDelete,
  _onUpdate,
  isLastChild,
  ...rest
}) => {
  return (
    <Swipeout
      disabled={disabledSwipe}
      close
      autoClose
      right={[
        {
          component: <BtnEdit onPress={_onUpdate} />,
        },
        {
          component: (
            <BtnDelete
              onPress={() => {
                Alert.alert(
                  `Delete "${name}"`,
                  'Do you want to delete this receiver?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: _onDelete},
                  ],
                  {cancelable: false},
                );
              }}
            />
          ),
        },
      ]}
    >
      <View
        style={[
          itemStyled.container,
          isLastChild ? itemStyled.lastChild : null,
        ]}
      >
        <TouchableOpacity {...rest}>
          <ReceiverIcon />
        </TouchableOpacity>
        <TouchableOpacity {...rest}>
          <View style={itemStyled.hook}>
            <Text style={itemStyled.name}>{name}</Text>
            <Text
              style={itemStyled.address}
              ellipsizeMode="middle"
              numberOfLines={1}
            >
              {address}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeout>
  );
};

const List = ({
  onSelectedAddress,
  receivers,
  disabledSwipe,
  onDelete,
  onUpdate,
  shouldDisabledItem,
  label = 'All',
  styledContainer = null,
}) => {
  return (
    <View style={[listStyled.container, styledContainer]}>
      <ScrollView>
        <Text style={listStyled.all}>{label}</Text>
        {receivers.map((item, key, arr) => (
          <Item
            key={item?.name || key}
            {...{
              ...item,
              disabledSwipe,
              _onDelete: () => onDelete(item),
              _onUpdate: () => onUpdate(item),
            }}
            onPress={() => onSelectedAddress(item)}
            disabled={shouldDisabledItem}
            isLastChild={arr.length - 1 === key}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const EmptyList = ({onSelectedAddress, address, disabledSelectedAddr}) => {
  return (
    <View style={emptyListStyled.container}>
      <View style={emptyListStyled.hook}>
        <Image source={srcNotFound} style={emptyListStyled.notFoundImg} />
        <Text style={emptyListStyled.notFound}>Not found</Text>
      </View>
      {!disabledSelectedAddr && (
        <Button
          style={emptyListStyled.btnUseAddr}
          title="Use this address"
          onPress={() => onSelectedAddress({address})}
        />
      )}
    </View>
  );
};

const Modal = props => {
  const {
    data,
    keySearch,
    onClearAddress,
    onSelectedAddress,
    onChangeKeySearch,
    disabledSwipe,
    onDelete,
    onUpdate,
    shouldDisabledItem,
    disabledSelectedAddr,
    recently,
    hideRecently,
  } = props;
  const isPlatformIOS = isIOS();
  const Wrapper = isPlatformIOS ? KeyboardAvoidingView : View;
  return (
    <View style={styled.container}>
      <SearchInput
        value={keySearch}
        onChangeText={onChangeKeySearch}
        placeholder="Search by name or address"
        onClearText={onClearAddress}
        containerStyled={{
          marginBottom: 10,
        }}
      />
      <Wrapper
        behavior="padding"
        keyboardVerticalOffset={120}
        style={{
          flex: 1,
        }}
      >
        {recently.length > 0 && !hideRecently && (
          <List
            label="Recent"
            onSelectedAddress={onSelectedAddress}
            receivers={recently}
            disabledSwipe={disabledSwipe}
            onDelete={onDelete}
            onUpdate={onUpdate}
            shouldDisabledItem={shouldDisabledItem}
          />
        )}
        {data.length > 0 ? (
          <List
            onSelectedAddress={onSelectedAddress}
            receivers={data}
            disabledSwipe={disabledSwipe}
            onDelete={onDelete}
            onUpdate={onUpdate}
            shouldDisabledItem={shouldDisabledItem}
            styledContainer={{flex: 1}}
          />
        ) : (
          <EmptyList
            onSelectedAddress={onSelectedAddress}
            address={keySearch}
            disabledSelectedAddr={disabledSelectedAddr}
          />
        )}
      </Wrapper>
    </View>
  );
};

Item.defaultProps = {};

Item.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  disabledSwipe: PropTypes.bool,
};

List.propTypes = {
  onSelectedAddress: PropTypes.func.isRequired,
  receivers: PropTypes.array.isRequired,
};

Modal.defaultProps = {
  disabledSwipe: true,
};

Modal.propTypes = {
  data: PropTypes.array.isRequired,
  keySearch: PropTypes.string.isRequired,
  onClearAddress: PropTypes.func.isRequired,
  onSelectedAddress: PropTypes.func.isRequired,
  setState: PropTypes.any.isRequired,
  onChangeKeySearch: PropTypes.func.isRequired,
  disabledSwipe: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  shouldDisabledItem: PropTypes.bool.isRequired,
  disabledSelectedAddr: PropTypes.bool.isRequired,
  recently: PropTypes.array.isRequired,
  hideRecently: PropTypes.bool.isRequired,
};

export default withModal(Modal);
