import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';





export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export async function GetFcmToken() {
  console.log('heter')
  let fcmToken = AsyncStorage.getItem('fcmToken');
  console.log('fmcToken', fcmToken)
  if (!fcmToken) {
    try {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (e) {
      console.log('error in fmc', e);
    }
  }
  else{
    console.log('inelse')
  }
}

export const NotificationListener = async () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
 messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      // setLoading(false);
    });

  messaging().onMessage(async remoteMessage => {
    console.log('notification on foreground state....', remoteMessage);
  });
};
