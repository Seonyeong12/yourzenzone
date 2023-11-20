try {
  self.importScripts("node_modules/firebase/firebase-compat.js");
  const firebaseConfig = {
    apiKey: "AIzaSyCr1AmUdqt6j2Y01bEHbzbYqF_GwmKKAjs",
    authDomain: "yourzenzone-c6531.firebaseapp.com",
    projectId: "yourzenzone-c6531",
    storageBucket: "yourzenzone-c6531.appspot.com",
    messagingSenderId: "830464043484",
    appId: "1:830464043484:web:e678a7bba42e2cbfe4c719",
    measurementId: "G-6S6312M496",
    databaseURL: "https://yourzenzone-c6531-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };


const app = firebase.initializeApp(firebaseConfig);
console.log("Initialized Firebase!", app);
const database = firebase.database();


chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === 'content'){
      database.ref(namespace+'content').set({
        content : newValue
      });
    }
  }
});

  } catch (e) {
    console.error(e);
  }