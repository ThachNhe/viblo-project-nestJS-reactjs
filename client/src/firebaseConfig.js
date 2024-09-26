// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4l70ahYwsaWX8ewQ2Zj33yq3leGj8zNw",
  authDomain: "viblo-notification.firebaseapp.com",
  projectId: "viblo-notification",
  storageBucket: "viblo-notification.appspot.com",
  messagingSenderId: "665803321778",
  appId: "1:665803321778:web:da1e287aaa68405e7a74ab",
  measurementId: "G-CZ9HMR5HFR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and get token
export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BLfus0nb45rDGxAIEh878XbLSGfnaoWXiidKx75waFbGb8bVAR1McXSue3AONIiskhQUmL7UGO1yrJ2vaE1MDLw",
      });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("Permission denied for notifications.");
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

// Listen for messages
export const listenForMessages = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // Handle foreground notifications (display alert, update UI, etc.)
  });
};
