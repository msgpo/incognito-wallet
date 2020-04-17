/* eslint-disable no-unused-vars */
import { ExHandler } from '@src/services/exception';
import routeNames from '@src/router/routeNames';
import firebase from 'react-native-firebase';
import { Platform } from 'react-native';
import { accountSeleclor, selectedPrivacySeleclor } from '@src/redux/selectors';
import { logEvent } from '@services/firebase';
import {
  actionNavigate,
  normalizedData,
  actionHasNoti,
  actionFetch,
  actionInit,
} from '@src/screens/Notification';
import { CONSTANT_COMMONS, CONSTANT_EVENTS } from '@src/constants';
import { v4 } from 'uuid';
import { mappingData, delay } from '../screens/Notification/Notification.utils';
import LogManager from './LogManager';
import NavigationService from './NavigationService';

const notifications = firebase.notifications();
let notificationId = {};
export const notificationInitialize = async (store) => {
  checkPermission();
  registerNotificationInBackground();
  registerWatchingNotificationOpened(store);
  registerHearingNotification();
};

// Request permission
export const requestPermission = async () => {
  try {
    await firebase.messaging().requestPermission();
  } catch (error) {
    console.log('Err while trying to request permission: ' + error.message || '');
  }
};

// Register token
export const registerToken = async () => {
  const fcmToken = await firebase.messaging().getToken();
  if (fcmToken) {
    console.log('Token: ' + fcmToken);
  }
};

// Check permission
export const checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled && enabled) {
    await registerToken();
  } else {
    await requestPermission();
  }
};

const registerNotificationInBackground = () => {
  firebase.notifications().getInitialNotification().then(async (notificationOpen) => {
    // console.log('registerNotificationInBackground:' + LogManager.parseJsonObjectToJsonString(notificationOpen));
    if (notificationOpen) {
      // App was opened by a notification
      // Get the action triggered by the notification being opened
      //   const action = notificationOpen.action;
      // Get information about the notification that was opened
      //   let data = notificationOpen.notification?._data;
      //   const notification = notificationOpen.notification;
      //   let typeTransfer = notificationOpen.notification?._data?.type;
      // Do something for logic
    }
  });
};

// I will handle the navigation if no token valid.
const registerWatchingNotificationOpened = (store) => {
  var notificationOpenedListener = firebase.notifications().onNotificationOpened(async (notificationOpen) => {
    // Get information about the notification that was opened
    console.log('notificationOpenedListener: ' + LogManager.parseJsonObjectToJsonString(notificationOpen));
    if (notificationOpen.notification) {
      //   let data = notificationOpen.notification._data;
      //   let typeTransfer = notificationOpen.notification._data.type;
      //   NavigationService.navigate(RouteKeys.DetailTransactionPopup, { transfer: JSON.parse(data.payload) || null });
      // Do something for logic
      // Dismiss this notification
      let notificationStandard = normalizedData(notificationOpen.notification?.data);
      navigateToScreen(notificationStandard, store);
      firebase.notifications().removeDeliveredNotification(notificationOpen.notification && notificationOpen.notification._notificationId || '');
    }
  });
};

const registerHearingNotification = () => {
  var notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
    // console.log('notificationDisplayedListener: ' + LogManager.parseJsonObjectToJsonString(notification));
    // Process your notification as required
    // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
  });
  var notificationListener = firebase.notifications().onNotification(async (notification) => {
    console.log('registerHearingNotification: ' + LogManager.parseJsonObjectToJsonString(notification));
    // Check if token is existed
    // I will check token exist here for displaying notification or not
    // Do something here ....

    if (Platform.OS === 'android') {
      const channelId = new firebase.notifications.Android.Channel('Default', 'Default', firebase.notifications.Android.Importance.Max)
        .setDescription('Max priority chanel');
      firebase.notifications().android.createChannel(channelId);
      let notificationDisplayed = new firebase.notifications.Notification({
        data: notification.data,
        sound: 'default',
        show_in_foreground: true,
        title: notification.title,
        body: notification.body,
      });
      notificationDisplayed
        .android.setPriority(firebase.notifications.Android.Priority.Max)
        .android.setChannelId(channelId)
        .android.setVibrate(1000);
      firebase.notifications().displayNotification(notificationDisplayed);
    } else {
      const localNotification = new firebase.notifications.Notification()
        .setNotificationId(notification._notificationId)
        .setTitle(notification._title && notification._title || '')
        .setBody(notification._body)
        .setData(notification._data);

      firebase.notifications().displayNotification(localNotification);
    }

    // If want to remove every notification before, do it! by id and free
    // firebase.notifications().removeDeliveredNotification(localNotification.notificationId);
    // firebase.notifications().removeAllDeliveredNotifications();
  });


  // Handle notification in background - automatically
  firebase.messaging().onMessage((message) => {
    backgroundNotificationHandler(message)
      .then();
  });
};
const navigateToScreen = async (item, store) => {
  try {
    const { id, type, publicKey, tokenId, screen, screenParams } = item;

    await logEvent(CONSTANT_EVENTS.CLICK_NOTIFICATION, { type });

    switch (type) {
    case 'broadcast': {
      NavigationService.navigate(routeNames.Home);
      return;
    }
    case 'reward-node':
    case 'unstake-success': {
      await delay(50);
      NavigationService.navigate(routeNames.Node);
      break;
    }
    case 'withdraw-coin':
    case 'withdraw-success':
    case 'balance-update':
    case 'deposit-update': {
      let rootState = store.getState();
      if (rootState) {
        const accountList = accountSeleclor.listAccount(rootState);
        const token = {
          ...selectedPrivacySeleclor.getPrivacyDataByTokenID(rootState),
          id: tokenId,
          ID: tokenId,
        };
        NavigationService.navigate(routeNames.WalletDetail, { followToken: token });
      } else {
        NavigationService.navigate(routeNames.WalletDetail);
      }
      break;
    }
    case 'go-to-screen': {
      const params = {};

      const rawParams = (screenParams || '').split('&');

      rawParams.forEach(param => {
        const parts = param.split('=');
        params[parts[0]] = parts[1];
      });

      NavigationService.navigate(screen, params);
      break;
    }
    default:
      break;
    }
  } catch (error) {
    new ExHandler(error).showErrorToast();
  }
};

export const backgroundNotificationHandler = async (message) => {
  return Promise.resolve(message);
};

/**
 * Set badge notifications
 * @param {number} badge set number of badge
 */
export const setBadge = async (badge) => {
  await notifications.setBadge(Number(badge));
};

/**
 * Reset badge notifications
 * @param {number} badge set number of badge
 */
export async function resetBadge() {
  await notifications.setBadge(Number(0));
}