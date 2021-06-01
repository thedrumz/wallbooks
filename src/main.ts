import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import "./assets/styles/index.sass";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESAGE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount("#app");
