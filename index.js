/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import NotificationServices from './src/utils/notificationServices';

const {onDisplayNotification} = NotificationServices();
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  onDisplayNotification(remoteMessage?.notification);
});
// Check whether an initial notification is available
messaging().getInitialNotification(async remoteMessage => {
  console.log('Message handled in the Forground!', remoteMessage);
  onDisplayNotification(remoteMessage?.notification);
});

AppRegistry.registerComponent(appName, () => App);
