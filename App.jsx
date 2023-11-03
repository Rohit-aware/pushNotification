import { StyleSheet, Text, View, PermissionsAndroid, Platform, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { notificationListner, requestUserPermission } from './src/utils/notificationServices'
import Route from './src/routes/Route'
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {

  useEffect(() => {
    Platform.OS == 'android' ? PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then(resp => {
      console.log("response..................", resp)
      if (resp && resp == 'granted') {
        requestUserPermission()
        notificationListner()
      }
    }).catch(error => {
      Alert.alert('something Wrong')
    })

      : undefined
  }, [])
  return (
    <GestureHandlerRootView style={[styles.rootStyle]}>
      <Route />
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({
  rootStyle: {
    flex: 1
  }
})