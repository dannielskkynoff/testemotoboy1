// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Replace with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/setup#config-web-app
const firebaseConfig = {
  apiKey: "AIzaSyCjDxtzK9ELCyxLNgmd0ZYDhB1o-bPLWr8",
  authDomain: "nuxpro-gestao-de-entregas.firebaseapp.com",
  databaseURL: "https://nuxpro-gestao-de-entregas-default-rtdb.firebaseio.com",
  projectId: "nuxpro-gestao-de-entregas",
  storageBucket: "nuxpro-gestao-de-entregas.firebasestorage.app",
  messagingSenderId: "483551326765",
  appId: "1:483551326765:web:e77ef1e29d69f58efa7ea4",
  measurementId: "G-FVR4EXZR93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics, firebaseConfig };