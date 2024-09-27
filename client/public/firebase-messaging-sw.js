// public/firebase-messaging-sw.js
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import { firebaseConfig } from "../src/firebaseConfig";

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
