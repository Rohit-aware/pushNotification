import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import navigationServices from '../routes/NavigationServices';

export const requestUserPermission =async ()=> {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken()
    }
}


const getFcmToken = async () => {
    try {
        const token = await messaging().getToken()
        console.log("Fcm token...................", token)

    } catch (error) {
        console.log("error in getFcmToken........", error)
    }
}


export const notificationListner = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log("notification....................",remoteMessage)
        // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });



    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage,
        );

        setTimeout(() => {
        navigationServices.ToNavigate('Setting')
        }, 1200);
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });


    return unsubscribe;
}