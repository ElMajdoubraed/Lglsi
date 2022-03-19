importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyD-UXf2KoJTn9zONViZbsHoF06X0dZKNvw",
      authDomain: "lglsi-3b.firebaseapp.com",
      projectId: "lglsi-3b",
      storageBucket: "lglsi-3b.appspot.com",
      messagingSenderId: "327698858752",
      appId: "1:327698858752:web:da40e293b4dfda4df1e9e5",
      measurementId: "G-WKHLK9T64M"
};


firebase.initializeApp(firebaseConfig);
const messaging=firebase.messaging();
registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey
});
messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification=JSON.parse(payload);
    const notificationOption={
        body:notification.body,
        icon:notification.icon
    };
    return self.registration.showNotification(payload.notification.title,notificationOption);
});