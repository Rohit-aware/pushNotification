import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidStyle} from '@notifee/react-native';
import {ToNavigate} from '../routes/NavigationServices';

const NotificationServices = () => {
  //   const [remoteMessageData, setRemoteMessageData] = useState();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    } else {
      authStatus = await messaging().requestPermission();
    }
  };

  const getFcmToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('Fcm token...................', token);
    } catch (error) {
      console.log('error in getFcmToken........', error);
    }
  };

  const notificationListner = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        'notification....................',
        remoteMessage.notification.title,
      );
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      onDisplayNotification(remoteMessage?.notification);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      //   setRemoteMessageData(remoteMessage);
      //   setTimeout(() => {
      //     navigationServices.ToNavigate(remoteMessage?.data?.route);
      //   }, 1200);
    });

    return unsubscribe;
  };

  const onDisplayNotification = async data => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    console.log('Daata................', data);

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: data?.title,
      body: data?.body,
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
          mainComponent: 'Setting', // The name of the screen to navigate to
        },
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: data.data.picture,
        },
      },
    });
  };

  notifee.onPressNotification(async response => {
    if (response.pressActionId === 'default') {
      // Navigate to the specified screen
      ToNavigate('setting');
    }
  });

  return {
    requestUserPermission,
    notificationListner,
    onDisplayNotification,
  };
};

export default NotificationServices;
