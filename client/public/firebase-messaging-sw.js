importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyB9txBOO3g8V2KWn4mMQ_G1eA_woWNOp7Q",
  authDomain: "viblo-fb.firebaseapp.com",
  projectId: "viblo-fb",
  storageBucket: "viblo-fb.appspot.com",
  messagingSenderId: "109860985300",
  appId: "1:109860985300:web:5471f85ba47ff42e3fde41",
  measurementId: "G-54V92WZF3V",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // Thay bằng icon bạn muốn
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
