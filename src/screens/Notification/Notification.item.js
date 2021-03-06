import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {BtnDelete, BtnRead} from '@src/components/Button';
import {CircleIcon} from '@src/components/Icons';
import format, {SHORT_DATE_TIME_FORMAT} from '@src/utils/format';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {COLORS} from '@src/styles';
import {useNavigation} from 'react-navigation-hooks';
import {styled} from './Notification.styled';
import {
  actionFetchDelete,
  actionFetchRead,
  actionNavigate,
} from './Notification.actions';

const withNotification = WrappedComponent => props => {
  const {_onOpen, _onClose, closeSwipe, item} = props;
  const {id, read} = item;
  const dispatch = useDispatch();
  const handleDeleteItem = () => dispatch(actionFetchDelete({id}));
  const handleReadItem = () => dispatch(actionFetchRead({id}));
  const swipeoutConfigs = {
    autoClose: true,
    close: closeSwipe,
    onOpen: _onOpen,
    onClose: _onClose,
    right: [
      {
        component: <BtnDelete onPress={handleDeleteItem} />,
      },
    ],
  };
  if (!read) {
    swipeoutConfigs.right = [
      {
        component: <BtnRead onPress={handleReadItem} />,
      },
      ...swipeoutConfigs.right,
    ];
  }
  return <WrappedComponent {...{...props, swipeoutConfigs}} />;
};

const Title = React.memo(({title}) => {
  if (title.includes('balance updated')) {
    let accountName = title.substring(0, title.lastIndexOf(' balance updated'));

    if (accountName.length > 10) {
      accountName = `${accountName.substring(0, 8)}...`;
    }

    return (
      <Text style={styled.title}>
        <Text>
          {accountName}
        </Text>
        <Text>
          &nbsp;balance updated!
        </Text>
      </Text>
    );
  }

  return (
    <Text style={styled.title}>
      {title}
    </Text>
  );
});

const Notification = React.memo(
  ({item, firstChild, lastChild, swipeoutConfigs}) => {
    const {title, desc, read, time} = item;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleNav = async () =>
      await dispatch(actionNavigate(item, navigation));

    return (
      <Swipeout {...swipeoutConfigs}>
        <TouchableWithoutFeedback
          onPress={handleNav}
          style={{
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <View
            style={[
              styled.notification,
              firstChild ?? styled.firstChild,
              lastChild ?? styled.lastChild,
              read ?? {opacity: 0.8},
            ]}
          >
            <View style={styled.icon}>
              <CircleIcon
                style={{
                  backgroundColor: read ? COLORS.lightGrey1 : COLORS.primary,
                }}
              />
            </View>
            <View style={styled.info}>
              <View style={styled.hook}>
                <Title title={title} />
                <Text style={styled.time}>{format.formatDateTime(time, SHORT_DATE_TIME_FORMAT)}</Text>
              </View>
              <Text style={styled.desc}>{desc}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Swipeout>
    );
  },
);

withNotification.propTypes = {
  _onClose: PropTypes.func.isRequired,
  _onOpen: PropTypes.func.isRequired,
  closeSwipe: PropTypes.bool.isRequired,
};

Notification.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    read: PropTypes.bool.isRequired,
    time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    tokenId: PropTypes.string.isRequired,
    publicKey: PropTypes.string.isRequired,
  }).isRequired,
  firstChild: PropTypes.bool.isRequired,
  lastChild: PropTypes.bool.isRequired,
  swipeoutConfigs: PropTypes.any.isRequired,
};

export default withNotification(Notification);
