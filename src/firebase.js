import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAdzwE0Gk_fWoNtl6gInow_5aboCPZP-vk",
  authDomain: "erudite-buckeye-256219.firebaseapp.com",
  databaseURL: "https://erudite-buckeye-256219.firebaseio.com",
  projectId: "erudite-buckeye-256219",
  storageBucket: "erudite-buckeye-256219.appspot.com",
  messagingSenderId: "84488541796",
  appId: "1:84488541796:web:e7f11deb50b098e57d3171"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

export { database };
